import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import socket from "@src/services/io";
import { ChangeEvent, useState } from "react";
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
  setIsActivity: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormComponent = ({ setIsActivity }: FormComponentProps) => {
  let typingTimeout: NodeJS.Timeout | null = null;

  const [msg, setMsg] = useState<string>("")
  const form = useForm<FormFieldType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  const message = form.formState.isValid;

  const onSubmit = (values: FormFieldType) => {
    try {
      if (values?.message) {
        socket.emit("message", values.message);
        form.reset();

        form.setFocus("message");
      }
    } catch (error) {
      // toast.error(error);
      console.error(error);
    }
  };

  const handleActivity = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
    setIsActivity(true);
    socket.emit("acitivity", socket.id?.substring(0, 5));

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      setIsActivity(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky bottom-0 flex h-25 w-full justify-center space-y-8 bg-[whitesmoke] drop-shadow-lg"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex w-3/4 items-center">
              <FormLabel className="self-center pt-8">Message</FormLabel>
              <FormControl className="self-end">
                <Input
                  {...field}
                  className="w-3/4 border-black"
                  placeholder="Your Message"
                  autoFocus
                  onChange={handleActivity}
                  value={msg}
                />
              </FormControl>
              {/* <FormDescription className="">Message</FormDescription> */}
              {/* <FormMessage className="" /> */}
            </FormItem>
          )}
        />
        {message && (
          <Button type="submit" className="self-center">
            Send
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FormComponent;
