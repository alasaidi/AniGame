import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUser } from "@/lib/react-query/queriesAndMutation";
import { useUserContext } from "@/context/AuthContext";
import FileUploader from "@/components/shared/FileUploader";

// Import the UserValidation schema
import { UserValidation } from "@/lib/validation";

// Extend the UserValidation schema to include bio and file
const UpdateUserValidation = UserValidation.extend({
  bio: z.string().max(160, "Bio must not exceed 160 characters."),
  file: z.any().optional(),
});

type FormData = z.infer<typeof UpdateUserValidation>;

function UpdateProfile() {
  const { toast } = useToast();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

  const form = useForm<FormData>({
    resolver: zodResolver(UpdateUserValidation),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      bio: user?.bio || "",
      file: [],
    },
  });

  const onSubmit = async (values: FormData) => {
    if (!user) {
      toast({ title: "User not found", description: "Please log in and try again." });
      return;
    }

    try {
      const updatedUser = await updateUser({
        userId: user.$id,
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        bio: values.bio,
        imageId: user.imageId || "",
        imageUrl: user.imageUrl || "",
        file: values.file,
      });

      if (updatedUser) {
        toast({ title: "Profile updated successfully" });
        navigate(`/user-profile/${user.$id}`);
      } else {
        toast({ title: "Failed to update profile" });
      }
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred." });
      console.error("Update profile error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={user?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoadingUpdate}>
            {isLoadingUpdate ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateProfile;
