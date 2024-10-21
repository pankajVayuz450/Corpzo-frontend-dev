import { format } from "date-fns";

const reusableFunctions = {
    formatDate : (dateString) => {
        return format(new Date(dateString), 'MMM dd, yyyy');
      }
}

export default reusableFunctions;