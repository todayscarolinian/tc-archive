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
    DialogDescription,
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
import { Pencil, Plus, Upload } from "lucide-react";

interface IssueDialogProps {
    mode: "add" | "edit";
    defaultValues?: EditIssuePayload;
    onSubmit: (data: AddIssuePayload | EditIssuePayload) => Promise<void>;
}

export default function IssueDialog({
    mode,
    defaultValues,
    onSubmit,
}: IssueDialogProps) {
    const [open, setOpen] = useState(false);

    const form = useForm<AddIssuePayload | EditIssuePayload>({
        resolver: zodResolver(
            mode === "add" ? AddIssueSchema : EditIssueSchema
        ),
        defaultValues: defaultValues || {
            title: "",
            publisher: "",
            publicationYear: new Date().getFullYear(),
            volume: 1,
            issueNumber: 1,
            category: "Magazine",
            thumbnailLink: "",
            pdfLink: "",
        },
    });

    async function handleSubmit(data: AddIssuePayload | EditIssuePayload) {
        try {
            await onSubmit(data);
            setOpen(false);
            form.reset();
        } catch (error) {
            console.error(error);
        }
    }

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
                                        <span className="font-bold">
                                            Title{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter title"
                                            {...field}
                                        />
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
                                        <span className="font-bold">
                                            Publisher{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter publisher"
                                            {...field}
                                        />
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
                                        <span className="font-bold">
                                            Publication Year{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter year"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number.parseInt(
                                                        e.target.value
                                                    )
                                                )
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
                                        <span className="font-bold">
                                            Volume{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter volume"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number.parseInt(
                                                        e.target.value
                                                    )
                                                )
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
                                        <span className="font-bold">
                                            Issue Number{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter issue number"
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    Number.parseInt(
                                                        e.target.value
                                                    )
                                                )
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
                                        <span className="font-bold">
                                            Category{" "}
                                        </span>
                                        <span className="text-destructive">
                                            *
                                        </span>
                                    </FormLabel>
                                    <Select onValueChange={field.onChange}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                className="font-bold"
                                                value="Magazine"
                                            >
                                                Magazine
                                            </SelectItem>
                                            <SelectItem
                                                className="font-bold"
                                                value="Newsletter"
                                            >
                                                Newsletter
                                            </SelectItem>
                                            <SelectItem
                                                className="font-bold"
                                                value="Photobook"
                                            >
                                                Photobook
                                            </SelectItem>
                                            <SelectItem
                                                className="font-bold"
                                                value="Miscellaneous"
                                            >
                                                Miscellaneous
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 grid-rows-1 justify-center items-center">
                            <FormField
                                control={form.control}
                                name="thumbnailLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            <span className="font-bold">
                                                Thumbnail{" "}
                                            </span>
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "thumbnail"
                                                            )
                                                            ?.click()
                                                    }
                                                >
                                                    Upload File{" "}
                                                    <Upload className="h-4 w-4" />
                                                </Button>
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
                                            <span className="font-bold">
                                                PDF File{" "}
                                            </span>
                                            <span className="text-destructive">
                                                *
                                            </span>
                                        </FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "pdfFile"
                                                            )
                                                            ?.click()
                                                    }
                                                >
                                                    Upload File{" "}
                                                    <Upload className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-white hover:bg-primary-700 text-primary-500 hover:text-white border-primary-500 flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-primary-500 hover:bg-primary-700 text-white flex cursor-pointer px-3 py-2 rounded-md items-center gap-2"
                            >
                                {mode === "add" ? "Submit" : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
