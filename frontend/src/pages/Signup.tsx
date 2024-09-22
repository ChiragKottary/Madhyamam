import { AuthSignUp } from "../components/AuthSignUp"
import { Quote } from "../components/Quote"

export const Signup = () =>{
        return <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <AuthSignUp/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
                
            </div>
        </div>
}