"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddIssueSchema,
  EditIssueSchema,
  type AddIssuePayload,
  type EditIssuePayload,
} from "../lib/types/issues.types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { FileText, Pencil, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import {
  addIssueAction,
  editIssueAction,
  deleteIssueAction,
} from "@/app/actions/issues";

export type IssueDialogSuccess =
  | { mode: "add" | "edit"; issue: EditIssuePayload }
  | { mode: "delete"; id: string };

interface IssueDialogProps {
  mode: "add" | "edit";
  defaultValues?: EditIssuePayload;
  onSuccess?: (result: IssueDialogSuccess) => void;
  yearFromRoute?: string;
  //   issueData?: EditIssuePayload;
}

export default function IssueDialog({
  mode,
  defaultValues,
  onSuccess,
  yearFromRoute,
}: //   issueData,
IssueDialogProps) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<AddIssuePayload | EditIssuePayload>({
    resolver: zodResolver(mode === "add" ? AddIssueSchema : EditIssueSchema),
    defaultValues:
      mode === "add"
        ? {
            title: "",
            publisher: "",
            publicationYear: yearFromRoute
              ? parseInt(yearFromRoute)
              : new Date().getFullYear(),
            volume: 1,
            issueNumber: 1,
            category: "Magazine" as const,
            thumbnailLink: "",
            pdfLink: "",
            createdBy: "placeholder-user",
            lastModified: new Date().toISOString(),
          }
        : defaultValues,
  });

  async function handleSubmit(data: AddIssuePayload | EditIssuePayload) {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.set("title", data.title);
      formData.set("publisher", data.publisher);
      formData.set("publicationYear", String(data.publicationYear));
      formData.set("volume", String(data.volume));
      formData.set("issueNumber", String(data.issueNumber));
      formData.set("category", data.category);
      if (thumbnailFile) formData.set("thumbnail", thumbnailFile);
      if (pdfFile) formData.set("pdf", pdfFile);

      const result =
        mode === "add"
          ? await addIssueAction(formData)
          : await (async () => {
              const editData = data as EditIssuePayload;
              formData.set("id", editData.id);
              formData.set("previousThumbnailLink", editData.thumbnailLink);
              formData.set("previousPdfLink", editData.pdfLink);
              formData.set("previousCreatedBy", editData.createdBy);
              return editIssueAction(formData);
            })();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setOpen(false);
      form.reset();
      setThumbnailFile(null);
      setPdfFile(null);
      toast.success(
        mode === "add"
          ? "Issue added successfully!"
          : "Issue updated successfully!"
      );
      onSuccess?.({ mode, issue: result.issue });
    } catch (error) {
      console.error("Error in form submission:", error);
      toast.error("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    if (defaultValues?.id) {
      try {
        const formData = new FormData();
        formData.set("id", defaultValues.id);
        if (defaultValues.thumbnailLink)
          formData.set("thumbnailLink", defaultValues.thumbnailLink);
        if (defaultValues.pdfLink)
          formData.set("pdfLink", defaultValues.pdfLink);

        const result = await deleteIssueAction(formData);
        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setOpenDelete(false);
        setOpen(false);
        onSuccess?.({ mode: "delete", id: defaultValues.id });
      } catch (error) {
        console.error("Error deleting issue:", error);
        toast.error("There was an error deleting the issue.");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2">
          {mode === "add" ? (
            <>
              Add Issue <Plus className="h-4 w-4" />
            </>
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add Issue" : "Edit Issue"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Title </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Publisher </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter publisher" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publicationYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Publication Year </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter year"
                      disabled={!!yearFromRoute}
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Volume </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter volume"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issueNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Issue Number </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter issue number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Category </span>
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="" value="Magazine">
                        Magazine
                      </SelectItem>
                      <SelectItem className="" value="Newsletter">
                        Newsletter
                      </SelectItem>
                      <SelectItem className="" value="Photobook">
                        Photobook
                      </SelectItem>
                      <SelectItem className="" value="Miscellaneous">
                        Miscellaneous
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 grid-rows-1 gap-5 justify-center items-center">
              <FormField
                control={form.control}
                name="thumbnailLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="font-bold">Thumbnail</span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <input
                          id="thumbnail"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setThumbnailFile(e.target.files[0]);
                              // Set a placeholder URL for the actual form field
                              field.onChange(
                                `https://placehold.co/600x400?text=Thumbnail-${Date.now()}`
                              );
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                          onClick={() =>
                            document.getElementById("thumbnail")?.click()
                          }
                        >
                          Upload File <Upload className="h-4 w-4" />
                        </Button>

                        {(field.value || thumbnailFile) && (
                          <div className="flex items-center gap-2">
                            {thumbnailFile ? (
                              <Image
                                src={URL.createObjectURL(thumbnailFile)}
                                alt="Thumbnail preview"
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-md object-cover border"
                              />
                            ) : (
                              <Image
                                src={field.value as string}
                                alt="Thumbnail preview"
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-md object-cover border"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pdfLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="font-bold">PDF File </span>
                      <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <input
                          id="pdfFile"
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              setPdfFile(e.target.files[0]);
                              field.onChange(
                                `https://placehold.co/600x400?text=pdf-${Date.now()}`
                              );
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="secondary"
                          className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                          onClick={() =>
                            document.getElementById("pdfFile")?.click()
                          }
                        >
                          Upload File <Upload className="h-4 w-4" />
                        </Button>

                        {(field.value || pdfFile) && (
                          <div className="flex items-center gap-2 p-2 border rounded-md">
                            <FileText className="h-6 w-6 text-primary-500" />
                            <span className="text-sm">
                              {pdfFile
                                ? pdfFile.name
                                : typeof field.value === "string"
                                ? field.value.split("/").pop() || "PDF Document"
                                : "PDF Document"}
                            </span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              {mode === "add" ? (
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white hover:bg-primary-700 text-primary-500 hover:text-white border-primary-500 flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              ) : (
                <>
                  <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-white hover:bg-primary-700 text-primary-500 hover:text-white border-primary-500 flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                      </DialogHeader>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                      <DialogFooter className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-white hover:bg-primary-700 text-primary-500 hover:text-white border-primary-500 flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                          onClick={() => setOpenDelete(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                          onClick={handleDelete}
                          disabled={loading}
                        >
                          {loading ? "Deleting..." : "Continue"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                disabled={loading}
              >
                {loading ? "Loading..." : mode === "add" ? "Submit" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
