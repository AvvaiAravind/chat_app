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

const FormComponent = () => {
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
      if (values?.message) {
        socket.emit("message", values.message);
        form.reset();

        form.setFocus("message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleActivity = () => {
    if (!isTyping) {
      socket.emit("activity", socket.id.substring(0, 5));
      isTyping = true;
    }

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("activity", "");
      isTyping = false;
    }, 3000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 flex h-25 w-full items-center justify-center space-y-8 bg-[whitesmoke] drop-shadow-lg"
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

        <Button type="submit" className="mb-7 self-center">
          Send
        </Button>
      </form>
    </Form>
  );
};

export default FormComponent;
