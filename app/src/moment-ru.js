import moment from "moment";
import "moment/dist/locale/ru";

// Под Vite side-effect импорт "moment/locale/ru" регистрируется в другом
// экземпляре moment, поэтому локаль включаем явно и в одном месте.
moment.locale("ru");

export default moment;
