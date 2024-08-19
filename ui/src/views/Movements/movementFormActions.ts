import { stockEntryService } from "@/service/movementService";
import { ActionFunction, redirect } from "react-router-dom";
import { z } from "zod";

const MovementFormSchema = z.object({
    reference: z.string().min(1),
    date: z.string().date(),
});

export type MovementFormSchemaErrors = z.inferFormattedError<typeof MovementFormSchema>
export type MovementFormServerError = string

export const movementFormActions: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const { success, data, error } = MovementFormSchema.safeParse(
        Object.fromEntries(form),
    );

    if (success) {
        const response = await stockEntryService.create({
            ...data,
        });

        if (response.success) {
            return redirect("/movements/" + response.data.id);
        } else {
            return response.error.response.message;
        }
    }

    return error.format()
};
