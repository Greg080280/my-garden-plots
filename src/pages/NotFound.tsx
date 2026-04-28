import { Link } from "react-router-dom";
import { tools } from "@/assets";

const NotFound = () => (
  <div className="container py-24 text-center">
    <img src={tools.wateringcan2} alt="" className="h-44 mx-auto opacity-80 animate-watering" />
    <p className="font-script text-5xl text-primary mt-6">Hopa, am rătăcit cărarea</p>
    <p className="text-muted-foreground mt-2">Pagina pe care o cauți s-a ascuns printre buruieni.</p>
    <Link to="/" className="inline-block mt-6 px-6 h-11 leading-[2.75rem] rounded-full bg-primary text-primary-foreground font-display font-semibold press">
      Înapoi acasă
    </Link>
  </div>
);

export default NotFound;
