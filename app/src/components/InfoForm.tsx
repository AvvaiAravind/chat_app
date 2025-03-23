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
  name: z
    .string()
    .min(1)
    .max(10)
    .refine((value) => value.trim().length > 0),
  chatRoom: z
    .string()
    .min(1)
    .max(10)
    .refine((value) => value.trim().length > 0),
});

type FormFieldType = z.infer<typeof FormSchema>;

type InfoFormProps = {
  nameRef: React.RefObject<HTMLInputElement | null>;
  roomRef: React.RefObject<HTMLInputElement | null>;
};

const InfoForm = ({ nameRef, roomRef }: InfoFormProps) => {
  const form = useForm<FormFieldType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      chatRoom: "",
    },
  });

  const onSubmit = () => {
    if (nameRef?.current?.value && roomRef?.current?.value) {
      socket.emit("enterRoom", {
        name: nameRef.current.value,
        room: roomRef.current.value,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="sticky top-0 flex h-15 w-full items-center justify-evenly bg-[whitesmoke] px-2 drop-shadow-lg my-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex self-end pb-4">
              <FormLabel className="">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    nameRef.current = el;
                  }}
                  className="border-black"
                  placeholder="Your Name"
                  autoFocus
                  value={field.value}
                  maxLength={10}
                  required
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="chatRoom"
          render={({ field }) => (
            <FormItem className="flex self-end pb-4">
              <FormLabel className="">Chat Room</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  ref={(el) => {
                    field.ref(el);
                    roomRef.current = el;
                  }}
                  className="border-black"
                  placeholder="Chat Room to join"
                  autoFocus
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="self-center">
          Join
        </Button>
      </form>
    </Form>
  );
};

export default InfoForm;
