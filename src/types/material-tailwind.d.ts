// eslint-disable-next-line @typescript-eslint/no-unused-vars
import MaterialTailwind from '@material-tailwind/react'

declare module '@material-tailwind/react' {
    interface CardProps {
        placeholder?,
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface ListItemProps {
        placeholder?,
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface TypographyProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface ListProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface ListItemPrefixProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface SpinnerProps {
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface ButtonProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface SwitchProps {
        crossOrigin?,
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface CheckboxProps {
        crossOrigin?,
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }


    interface DialogProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
        open: boolean,
    }

    interface DialogHeaderProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface DialogFooterProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface DialogBodyProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface SelectProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }

    interface OptionProps {
        placeholder?
        onPointerEnterCapture?,
        onPointerLeaveCapture?,
    }
}