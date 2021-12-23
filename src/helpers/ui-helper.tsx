import { toast, Slide } from "react-toastify";
import React, { CSSProperties } from "react";

export default class UiHelper {
    /* istanbul ignore next */
    static showToast(message: string) {
        toast.info(
            message,
            {
                closeButton: () => <React.Fragment/>,
                transition: Slide,
                hideProgressBar: true,
                position: "bottom-center",
            }
        );
    }

    static showErrorToast(message: string) {
        toast.error(
            message,
            {
                closeButton: () => <React.Fragment/>,
                transition: Slide,
                hideProgressBar: true,
                position: "bottom-center",
            }
        );
    }

    static getLessonColor(lesson: string): LessonColor {
        lesson = lesson.toLocaleLowerCase();
        if (lesson.includes("физика")) return { color: "#BBEDBF", colorAccent: "#68D676" };
        if (lesson.includes("геометрия")) return { color: "#FBDDC3", colorAccent: "#F5A664" };
        if (lesson.includes("география")) return { color: "#FEF0C5", colorAccent: "#FCCF62" };
        if (lesson.includes("английский")) return { color: "#C5CAFE", colorAccent: "#6D73FD" };
        if (lesson.includes("алгебра")) return { color: "#F8CBC4", colorAccent: "#F18477" };
        if (lesson.includes("русский")) return { color: "#E9B6FC", colorAccent: "#D46DF9" };
        if (lesson.includes("химия")) return { color: "#C4EBFD", colorAccent: "#83D4FC" };
        if (lesson.includes("биология")) return { color: "#c4d0fd", colorAccent: "#8387fc" };
        if (lesson.includes("история")) return { color: "#c4fdce", colorAccent: "#6bd082" };
        if (lesson.includes("информатика")) return { color: "#c4fdee", colorAccent: "#74debd" };
        if (lesson.includes("технология")) return { color: "#c4fdee", colorAccent: "#74debd" };
        if (lesson.includes("литература")) return { color: "#e8c4fd", colorAccent: "#e483fc" };
        if (lesson.includes("математика")) return { color: "#fddcc4", colorAccent: "#fcb983" };
        if (lesson.includes("обществознание")) return { color: "#fdc4ca", colorAccent: "#fc8383" };
        if (lesson.includes("физкультура")) return { color: "#fdc4d0", colorAccent: "#fc8393" };

        return {
            color: "#cccccc",
            colorAccent: "#8f8f8f"
        }
    }

    static formatSubjectName(name: string): string {
        if (name === "Основы безопасности жизнедеятельности") return "ОБЖ";
        if (name.toLowerCase().includes("немецкий язык")) return "Немецкий язык";
        if (name.toLowerCase().includes("изобразительное искусство")) return "ИЗО";
        if (name.toLowerCase().includes("английский язык")) return "Английский язык";
        if (name.toLowerCase().includes("всеобщая история")) return "Всеобщая история";
        if (name.toLowerCase().includes("физическая культура")) return "Физкультура";
        return name;
    }
 }

export type LessonColor = {
    color: string,
    colorAccent: string,
}
