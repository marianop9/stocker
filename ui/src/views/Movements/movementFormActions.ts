import { movementService } from "@/service/movementService";
import { ActionFunction, redirect } from "react-router-dom";
import { z } from "zod";

const MovementFormSchema = z.object({
    date: z.string().date(),
    type: z.enum(["IN", "OUT"]),
    reference: z.string().max(200),
});

export type MovementFormSchemaErrors = z.inferFormattedError<
    typeof MovementFormSchema
>;
export type MovementFormServerError = string;

export const movementFormActions: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const { success, data, error } = MovementFormSchema.safeParse(
        Object.fromEntries(form),
    );

    if (!success) return error.format();

    const response = await movementService.create({
        id: "",
        state: "OPEN",
        ...data,
    });

    if (response.success) {
        return redirect("/movements/" + response.data.id);
    } else {
        return response.error.response.message;
    }
};
