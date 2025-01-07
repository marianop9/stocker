import AppFormEntry from "@/components/AppFormEntry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAppAuth from "@/lib/auth/authContext";
import { Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodFormattedError } from "zod";

const formSchema = z.object({
    user: z.string().email("Ingrese un email válido"),
    password: z.string().min(1, "Ingrese una contraseña"),
});
type FormType = z.infer<typeof formSchema>;

function LoginView() {
    const [formError, setFormError] = useState<ZodFormattedError<FormType> | null>(null);

    const [authErrorMessage, setAuthErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const passwordInputType = showPassword ? "text" : "password";

    const { userData, login } = useAppAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (userData.isValid) {
            console.log("data is valid");

            navigate("/");
            return;
        }

        setAuthErrorMessage("");
        setFormError(null);
        const form = new FormData(e.currentTarget);

        const result = formSchema.safeParse(Object.fromEntries(form));

        if (!result.success) {
            setFormError(result.error.format());
            return;
        }

        const { user, password } = result.data;
        const authResponse = await login(user, password);

        console.log("success", authResponse.success);
        if (!authResponse.success) {
            setAuthErrorMessage(authResponse.error);
            return;
        }
        console.log("navigating");

        navigate("/");
    }

    return (
        <div className="flex h-screen bg-gray-200">
            <div className="m-auto min-w-[30%] bg-white p-4 rounded-lg">
                <h1 className="text-2xl font-bold">Iniciar sesión</h1>
                <div className="mt-4">
                    <form noValidate onSubmit={handleSubmit}>
                        <AppFormEntry label="Usuario" name="user" errors={formError?.user?._errors}>
                            <Input name="user" type="email" />
                        </AppFormEntry>
                        <AppFormEntry
                            label="Contraseña"
                            name="password"
                            errors={formError?.password?._errors}
                        >
                            <div className="flex items-center">
                                <Input name="password" type={passwordInputType} />
                                <span className="flex justify-end items-center">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="absolute "
                                        type="button"
                                        onClick={() => setShowPassword((v) => !v)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </Button>
                                </span>
                            </div>
                        </AppFormEntry>

                        {authErrorMessage && (
                            <div className="my-2 p-1 bg-red-300 text-red-600 text-sm rounded">
                                {authErrorMessage}
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button type="submit">Ingresar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginView;
