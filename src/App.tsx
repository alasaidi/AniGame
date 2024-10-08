import { Route, Routes } from "react-router-dom";
import SignInForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import "./global.css";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  LikedPosts,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import AuthLaout from "./_auth/AuthLaout";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
export const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public Route */}
        <Route element={<AuthLaout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Public Route */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/liked-post/:id" element={<LikedPosts />} />

          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};
