import { movementService } from "@/service/movementService";
import { ActionFunction, redirect } from "react-router-dom";
import { z } from "zod";

const MovementFormSchema = z.object({
    date: z.string().date(),
    type: z.enum(["IN", "OUT"]),
    reference: z.string().max(200),
});

export type MovementFormSchemaErrors = z.inferFormattedError<typeof MovementFormSchema>;
export type MovementFormServerError = string;

export const movementFormActions: ActionFunction = async (ctx) => {
    switch (ctx.request.method) {
        case "POST":
            return createMovementAction(ctx);
        case "DELETE":
            return deleteMovementAction(ctx);
    }
};

const createMovementAction: ActionFunction = async ({ request }) => {
    const form = await request.formData();

    const { success, data, error } = MovementFormSchema.safeParse(Object.fromEntries(form));

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

const deleteMovementAction: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const id = form.get("id");

    if (!id) {
        return {
            ok: false,
            error: "expected movement id",
        };
    }

    const resp = await movementService.delete(id as string);
    if (!resp.success) {
        console.log(resp.message);
    }

    return resp;
};
