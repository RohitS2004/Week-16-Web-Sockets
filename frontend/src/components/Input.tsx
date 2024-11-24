import { forwardRef } from "react";

type FontSize = "xs" | "sm" | "md" | "lg" | "xl";
type FontColor = "black" | "white";
type BackgroundColor = "black" | "white" | "slate";

interface InputProps {
    placeholder: string;
    padding: String;
    fontSize: FontSize;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
    borderRadius: String;
    border: String;
    outline: String;
    labelText?: String;
    inputType: string;
    classes?: String;
}

const FontSizeType = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",  
    lg: "text-lg",
    xl: "text-xl",
}

const FontColorType = {
    black: "text-black",
    white: "text-white",
}

const BackgroundColorType = {
    black: "bg-black",
    white: "bg-white",
    slate: "bg-slate-200",
}

const Input = (props: InputProps, ref: any) => {
    return (
        <div className={`${props.classes}`}>
            <input 
            type={props.inputType}
            placeholder={props.placeholder}
            ref={ref}
            className={`
                ${props.padding}
                ${props.borderRadius}
                ${props.border}
                ${props.outline}
                ${FontSizeType[props.fontSize]}
                ${FontColorType[props.fontColor]}
                ${BackgroundColorType[props.backgroundColor]}
                w-full
                `}
            />
        </div>
    )
}

export default forwardRef(Input);