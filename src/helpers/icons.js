import { library } from "@fortawesome/fontawesome-svg-core";

import { 
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faSpinner, 
    faPlusCircle,
    faEnvelope,
    faMapMarkedAlt,
    faLock

} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
//listing icons from font-awesome
return library.add(
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faSpinner, 
    faPlusCircle,
    faEnvelope,
    faMapMarkedAlt,
    faLock);
}

export default Icons;