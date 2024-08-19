from dotenv import load_dotenv
from langchain_google_genai  import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.document_loaders import PyPDFLoader
from langchain.chains import  ConversationalRetrievalChain
from langchain.text_splitter import  RecursiveCharacterTextSplitter
from langchain.vectorstores import DocArrayInMemorySearch
from fastapi import FastAPI, UploadFile, File
from langchain.memory import ConversationBufferMemory
import os
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()


# CORS configuration
allowed_origins = ["http://localhost:5173"]  # Replace with your allowed origins
app.add_middleware(
    CORSMiddleware, allow_origins=allowed_origins, allow_methods=["*"], allow_headers=["*"]
)

db = None

class Question(BaseModel):
    question: str
    
chat_history = [
    ("user", "Hello, world!"),
    ("system", "Hello there!")
]

memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
@app.post("/upload_document")
async def upload_document(file: UploadFile = File(...)):
    global db  # Access global db variable
    
    # Get the directory of the current script
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Construct the file path
    file_path = os.path.join(current_dir, file.filename)
    
        # Save the file
    with open(file_path, "wb") as f:
        f.write(await file.read())
    

    # Load and process document
    loader = PyPDFLoader(file_path)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    docs = text_splitter.split_documents(documents)
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    db = DocArrayInMemorySearch.from_documents(docs, embeddings)
    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 1})

    return {"message": "Document uploaded and processed successfully"}


@app.post("/chat")
async def chat(question: Question):
    global db  # Access global db variable
    global chat_history
    global memory
    
    print (question.question)
    
    if not db:
        return {"error": "No document uploaded yet"}
    
    if not chat_history:
        return {"error": "No chat history yet"}
    
    if not memory:
        return {"error": "No memory yet"}

    retriever = db.as_retriever(search_type="similarity", search_kwargs={"k": 1})
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash")  # Replace with your preferred LLM
    qa = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        return_generated_question=True,
    )
    
    # Invoke the QA chain
    result = qa.invoke({"question": question.question, "chat_history": chat_history})
    
    # Add the question and answer to chat history
    chat_history.append(("user", question.question))
    chat_history.append(("system", result["answer"]))

    return {"answer": result["answer"]}

@app.get("/chat_history")
async def get_chat_history():
    return {"chat_history": chat_history}