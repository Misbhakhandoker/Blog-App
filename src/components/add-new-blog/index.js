import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment } from "react";
import { Button } from "../ui/button";

function AddNewBlog({openBlogDialog, setOpenBlogDialog, loading, blogFormData, setBlogFormData, handleSaveBlogData,currentEditedBlogID,setCurrentEditedBlogID}) {
  return (
    <Fragment>
      <div>
        {" "}
        <Button onClick={() => setOpenBlogDialog(true)}>
          Add New Blog
        </Button>{" "}
      </div>
      <Dialog open={openBlogDialog} onOpenChange={() => {
        setOpenBlogDialog(false),
        setBlogFormData({
        title: "",
        description: ""
      }),
      setCurrentEditedBlogID(null)
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentEditedBlogID ? "Edit Blog" :"Add New Blog"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input name="title" placeholder="Enter blog title" value={blogFormData.title} onChange={(event) => setBlogFormData({
                ...blogFormData, title: event.target.value
              })} className="col-span-3" />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input name="description"  placeholder="Enter blog description" value={blogFormData.description} onChange={(event) => setBlogFormData({
                ...blogFormData, 
                description: event.target.value
              })} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlogData} type="button"> {loading ? "Saveing changes" : "Save changes"} </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default AddNewBlog;
