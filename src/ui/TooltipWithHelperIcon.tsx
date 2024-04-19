import {Tooltip, Typography} from "@material-tailwind/react";
import {FC} from "react";
import {FaRegCircleQuestion} from "react-icons/fa6";

const TooltipWithHelperIcon: FC = () => {
    return (
        <Tooltip
            content={
                <div className="w-80">
                    <Typography color="white" className="font-medium">
                        使用方法
                    </Typography>
                    <Typography
                        variant="small"
                        color="white"
                        className="font-normal opacity-80"
                    >
                        可以直接从下方选择框中拖动卡片放置到上方（建议使用鼠标）；或者点击上方卡片（可以看到高亮），此时点击下方卡片可以更换（移动端兼容使用方式）。<br /><br />
                        点击 Leader 处标签可以更改队长，拖动可以改变角色位置。<br /><br />
                        可以从悬浮框进入详情，但是现在并没有做好。<br /><br />
                        现在 CT 等等都是占位的，现在还没有实现逻辑计算，这些显示没有实际意义！
                    </Typography>
                </div>
            }
        >
            <div>

                <FaRegCircleQuestion size={20} />
            </div>
        </Tooltip>
    );
}

export default TooltipWithHelperIcon;