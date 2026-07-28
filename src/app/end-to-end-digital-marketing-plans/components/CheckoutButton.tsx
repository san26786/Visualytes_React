import {
LoaderCircle
} from "lucide-react";


type CheckoutButtonProps = {
    loading: boolean;
    onClick: () => void;
  };
  
  
  export default function CheckoutButton({
    loading,
    onClick,
  }: CheckoutButtonProps){


return (

<button

onClick={onClick}

disabled={loading}

className="
mt-8
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-cyan-400
to-fuchsia-400
px-6
py-4
font-bold
text-black
transition
hover:scale-[1.02]
disabled:opacity-50
"

>

{
loading
?
<LoaderCircle className="animate-spin"/>
:
"Start Plan"
}


</button>

)

}
