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
}