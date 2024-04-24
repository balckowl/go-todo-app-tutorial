import { useState } from "react"
import { useForm } from "@mantine/form"
import { Button, Group, Modal, TextInput, Textarea } from "@mantine/core"
import { ENDPOINT } from "../App"

const AddTodo = () => {

    const [open, setOpen] = useState<boolean>(false)

    const { onSubmit, getInputProps, reset } = useForm({
        initialValues: {
            title: "",
            body: ""
        }
    })

    const createTodo = async (values: { title: string, body: string }) => {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }).then((r) => r.json())

        reset()
    }

    return (
        <div>
            <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
                <form onSubmit={onSubmit(createTodo)}>
                    <TextInput required mb={12} label="todo" placeholder="what do you want to do?" {...getInputProps("title")} />
                    <Textarea required mb={12} label="body" placeholder="what do you want to do?" {...getInputProps("body")} />

                    <Button type="submit">Create todo</Button>
                </form>
            </Modal>

            <Group>
                <Button fullWidth mb={12} onClick={() => setOpen(true)}>ADD TODO</Button>
            </Group>
        </div>
    )
}

export default AddTodo