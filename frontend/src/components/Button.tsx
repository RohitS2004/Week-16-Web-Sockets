type FontSize = "xs" | "sm" | "md" | "lg" | "xl"
type FontColor = "black" | "white";
type BackgroundColor = "black" | "white";

interface ButtonProps {
    text: String;
    onClick: () => void;
    padding: String;
    borderRadius: String;
    fontSize: FontSize;
    fontColor: FontColor;
    backgroundColor: BackgroundColor;
    onHoverStyle: String;
    onActiveStyle: String;
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
}

const Button = (props: ButtonProps) => {
    return (
        <button
        className={`
            ${props.padding}
            ${props.borderRadius}
            ${props.onHoverStyle}
            ${props.onActiveStyle}
            ${FontSizeType[props.fontSize]}
            ${FontColorType[props.fontColor]}
            ${BackgroundColorType[props.backgroundColor]}
            transition-all duration-100 ease-in
            `}

        onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default Button;