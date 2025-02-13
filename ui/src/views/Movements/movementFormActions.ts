import { IMovementDto, movementStates, movementTypes } from "@/models/movements";
import { movementService } from "@/service/movementService";
import { ActionFunction, redirect } from "react-router-dom";
import { z } from "zod";

const MovementFormSchema = z.object({
    id: z.string().optional(),
    state: z.enum(movementStates),
    date: z.string().date(),
    type: z.enum(movementTypes),
    reference: z.string().max(200),
    paymentType: z.enum(["CASH", "CARD", "PROMO"]),
    discount: z.coerce.number().min(0).max(100).optional(),
});

type MovementFormSchemaErrors = z.inferFormattedError<typeof MovementFormSchema>;
type MovementFormServerError = string;

export type MovementFormErrors =
    | {
          errorType: "Form";
          errors: MovementFormSchemaErrors;
      }
    | {
          errorType: "Server";
          errors: MovementFormServerError;
      }
    | {
          errorType: "None";
      };

export const movementFormActions: ActionFunction = async (ctx) => {
    switch (ctx.request.method) {
        case "POST":
            return createMovementAction(ctx);
    }
};

const createMovementAction: ActionFunction = async function ({
    request,
}): Promise<MovementFormErrors | Response> {
    const form = await request.formData();

    const obj = Object.fromEntries(form);
    console.log(obj);
    const { success, data, error } = MovementFormSchema.safeParse(obj);

    if (!success)
        return {
            errorType: "Form",
            errors: error.format(),
        };

    const isCreate = data.id === undefined || data.id === "";

    if (data.paymentType !== "PROMO") {
        data.discount = 0;
    }

    const movement: IMovementDto = {
        ...data,
        id: data.id ?? "",
        state: data.state ?? "OPEN",
        discount: data.discount ?? 0,
    };

    const response = await movementService.createOrUpdate(movement);

    if (!response.success) {
        return {
            errorType: "Server",
            errors: response.error.message,
        };
    }

    // redirect to new movement detail
    if (isCreate) return redirect("/movements/" + response.data.id);

    // signals sucess, the loader should automatically refetch the updated movement
    return { errorType: "None" };
};
