import SignUpWithEmail from "../components/signup/SignupWithEmail";

const SignUp = () => (
    <main>
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="w-full max-w-xs">
                <SignUpWithEmail />
            </div>
        </div>
    </main>
)

export default SignUp;