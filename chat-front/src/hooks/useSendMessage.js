import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../services/sendMessage";

export function useSendMessage() {
  const queryClient = useQueryClient();

  const { mutate: askQuestion, isPending: isSending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
    },
  });

  return { isSending, askQuestion };
}
