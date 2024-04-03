"use client"
import React from 'react';
import { useForm } from "react-hook-form";
import { Textarea as UITextarea } from "@/components/ui/textarea";
import { FormItem } from "@/components/ui/form"; 
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';


const TextareaWithIcon = ({ icon, ...props }) => {
    return (
        <div className="group relative m-4">
            <UITextarea {...props} className="w-full text-xl h-26 bg-white shadow-md hover:border-sky-400 hover:border-2" />
            <div className="absolute right-2 top-2 flex flex-col items-end opacity-0 group-hover:opacity-60 transition-opacity space-y-2">
                {React.cloneElement(icon)}
                <TrashIcon /> 
            </div>
        </div>
    );
};


export default function TaskCard() {
    const { register, handleSubmit } = useForm({ defaultValues: { username: '' } });
    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormItem>
                <TextareaWithIcon
                    icon={<EditIcon />}
                    {...register("username")}
         />
            </FormItem>
        </form>
    );
}
