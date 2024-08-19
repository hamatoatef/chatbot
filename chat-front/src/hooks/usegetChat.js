import { useQuery } from "@tanstack/react-query";
import { getChat } from "../services/getMessages";

export function useChat() {
  const { isPending, data: chat } = useQuery({
    queryKey: ["chat"],
    queryFn: getChat,
  });

  return { isPending, chat };
}
