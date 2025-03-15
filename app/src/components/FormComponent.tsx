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
import io from "@src/services/io";
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
  const form = useForm<FormFieldType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  // const message = form.formState.isValid;

  const onSubmit = (values: FormFieldType) => {
    try {
      if (values?.message) {
        io.emit("message", values.message);
        form.reset();

        form.setFocus("message");
      }
    } catch (error) {
      // toast.error(error);
      console.error(error);
    }
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
            <FormItem className="flex w-3/4 items-center">
              <FormLabel className="">Message</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-3/4 border-black"
                  placeholder="Your Message"
                  autoFocus
                />
              </FormControl>
              {/* <FormDescription className="">Message</FormDescription> */}
              {/* <FormMessage className="" /> */}
            </FormItem>
          )}
        />
        {/* {message && ( */}
        <Button type="submit" className="self-center">
          Send
        </Button>
        {/* )} */}
      </form>
    </Form>
  );
};

export default FormComponent;
