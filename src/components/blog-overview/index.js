"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import { Button } from "../ui/button";

const initialBlogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse = currentEditedBlogID !== null ?  await fetch(`/api/update-blog?id=${currentEditedBlogID}`,{
        method: "PUT",
        body: JSON.stringify(blogFormData),
      }) : await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        setCurrentEditedBlogID(null)
        router.refresh();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }

  async function handleEdit(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  }

  async function handleDeleteBlogByID(getCurrentID) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col min-h-screen gap-10 p-6 bg-gradient-to-r from-purple-500 to-blue-600">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditedBlogID={currentEditedBlogID}
        setCurrentEditedBlogID={setCurrentEditedBlogID}
      />
      <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className="p-5" key={blogItem.id}>
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem.description}</CardDescription>
                <div className="flex gap-5 mt-5">
                  <Button onClick={() => handleEdit(blogItem)}>Edit</Button>
                  <Button onClick={() => handleDeleteBlogByID(blogItem._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <Label className="text-2xl font-bold text-center text-white">
              No Blog Found! Please add one
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
