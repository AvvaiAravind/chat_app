import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import socket from "@src/services/io";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  message: z
    .string()
    .min(1)
    .max(50)
    .refine((value) => value.trim().length > 0),
});

type FormFieldType = z.infer<typeof FormSchema>;

type FormComponentProps = {
  nameRef: React.RefObject<HTMLInputElement | null>;
  roomRef: React.RefObject<HTMLInputElement | null>;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};
const FormComponent = ({ nameRef, roomRef, setUser }: FormComponentProps) => {
  let typingTimeout: NodeJS.Timeout;
  let isTyping = false;

  const form = useForm<FormFieldType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: FormFieldType) => {
    try {
      if (
        nameRef?.current?.value &&
        roomRef?.current?.value &&
        values?.message
      ) {
        const msg = values?.message;
        socket.emit("message", {
          id: socket.id,
          message: msg,
          name: nameRef.current.value,
        });
        form.reset();

        form.setFocus("message");
      } else {
        alert("Name & Chat Room are must");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivity = () => {
    if (!isTyping && nameRef?.current?.value) {
      const name = nameRef.current.value;
      socket.emit("activity", name);
      isTyping = true;
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("activity", "");
      isTyping = false;
    }, 3000);
  };

  useEffect(() => {
    setUser(socket.id);
  }, [socket.id]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 my-2 flex h-15 w-full items-center justify-center bg-[whitesmoke] shadow-[0_-8px_10px_-1px_rgba(0,0,0,0.2)]"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex w-3/4 self-end pb-4">
              <FormLabel className="">Message</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-3/4 border-black"
                  placeholder="Your Message"
                  autoFocus
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    handleActivity();
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="self-center">
          Send
        </Button>
      </form>
    </Form>
  );
};

export default FormComponent;
