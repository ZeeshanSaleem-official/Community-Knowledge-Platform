'use client'
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@nextui-org/react'
import * as actions from '@/actions'
export default function TopicCreateForm() {
    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create a Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.createTopic}>
                    <div className=' flex flex-col gap-4 p-4 w-80'>
                        <h3> Create a Topic</h3>
                        <Input label="Name" labelPlacement='outside' placeholder='Name'></Input>
                        <Textarea label="Description" labelPlacement='outside' placeholder='Describe your Topic'></Textarea>
                        <Button type='submit'>
                            Submit
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}