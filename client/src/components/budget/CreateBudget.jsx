import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserApi } from "../../services/api";

function CreateBudget({ createGoal, getAllGoals, setBudgetList }) {
    const { getProfile } = useUserApi();

    const [userId, setUserId] = useState();
    const [emojiIcon, setEmojiIcon] = useState("😀");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState("");
    const [savedAmount, setSavedAmount] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                console.log(response.data.user.id);
                setUserId(response.data.user.id);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBudget = {
            userId,
            emoji: emojiIcon,
            title: name,
            targetAmount: parseFloat(targetAmount),
            savedAmount: parseFloat(savedAmount),
        };

        try {
            const response = await createGoal(newBudget);
            if (response.status === 201) {
                const updatedGoals = await getAllGoals();
                setBudgetList(updatedGoals.data);
                setName("");
                setSavedAmount("");
                setTargetAmount("");
                setEmojiIcon("😀");
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Error creating budget:", error);
        }
    };

    const openModal = () => setIsModalOpen(true);

    return (
        <>
            <div
                className="bg-slate-100 p-10 rounded-2xl
            items-center flex flex-col border-2 border-dashed
            cursor-pointer hover:shadow-md"
                onClick={openModal}
            >
                <h2 className="text-3xl">+</h2>
                <h2>Create New Budget</h2>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit} className="mt-5">
                                <Button
                                    variant="outline"
                                    className="text-lg"
                                    onClick={() =>
                                        setOpenEmojiPicker(!openEmojiPicker)
                                    }
                                >
                                    {emojiIcon}
                                </Button>

                                {openEmojiPicker && (
                                    <div className="absolute z-20">
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Budget Name
                                    </h2>
                                    <Input
                                        placeholder="e.g. Home Decor"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Saved Amount (As of today)
                                    </h2>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5000$"
                                        value={savedAmount}
                                        onChange={(e) =>
                                            setSavedAmount(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">
                                        Budget Target Amount
                                    </h2>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 5000$"
                                        value={targetAmount}
                                        onChange={(e) =>
                                            setTargetAmount(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <DialogFooter className="sm:justify-start">
                                    <Button
                                        type="submit"
                                        className="mt-5 w-full rounded-full"
                                    >
                                        Create Budget
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CreateBudget;
