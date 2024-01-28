import { type DetailedHTMLProps, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>): React.ReactElement {
  return (
    <div className={cn("relative h-6 w-6", className)} {...props}>
      <svg
        data-name="Layer 1"
        id="Layer_1"
        viewBox="0 0 28.8633 31.6665"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            {`.cls-1 {
          fill: currentColor;
          stroke-width: 0px;
        }`}
          </style>
        </defs>
        <path
          className="cls-1"
          d="M21.6086,14.533l-14.5715-6.4396C3.6369,6.7992,2.153,4.677,1.5068,3.1223c-.0185-.0445-.0365-.0889-.0539-.133-.1053.2005-.2105.4116-.3131.632-.4628.9936-.7859,1.9819-.9603,2.9375-.2118,1.1606-.2032,2.277.0256,3.3183.6383,2.9047,3.0074,5.3444,7.0421,7.2517l14.5903,6.4476c3.394,1.2945,4.8758,3.4144,5.5215,4.9677.0185.0445.0365.0889.0539.133.1053-.2005.2105-.4116.3131-.632.4628-.9936.7859-1.9819.9603-2.9375.2118-1.1606.2032-2.277-.0256-3.3183-.6388-2.907-3.0116-5.3485-7.0521-7.2564Z"
        />
        <polygon
          className="cls-1"
          points="0 31.6665 9.5592 26.182 0 20.6974 0 31.6665"
        />
        <polygon
          className="cls-1"
          points="19.3041 5.4845 28.8633 10.9691 28.8633 0 19.3041 5.4845"
        />
      </svg>
    </div>
  );
}