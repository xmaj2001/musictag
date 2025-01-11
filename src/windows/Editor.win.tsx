import { motion } from 'framer-motion'
import { Button, Image, Spacer } from "@nextui-org/react"
import logo from "../assets/imgs/logo.jpeg"
import '../assets/css/style.css'
import { BiExit } from 'react-icons/bi'
import Form from '../components/Form'
import { useState } from 'react'
import Itags from '../interfaces/Itags'
import '../assets/css/style.css'

function EditorWin() {
    const [tags, setTags] = useState<Itags>({
        title: 'Music',
        artist: '',
        album: '',
        year: '0',
        genre: '',
        cover: '/src/assets/imgs/logo.jpeg',
        bpm: '0',
        copyright: ''
    });
    const changeTags = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTags({ ...tags, [name]: value });
    }

    return (
        <motion.div className="pageeditor h-screen w-screen bg-white relative rounded-lg">
            <Button isIconOnly className='bg-orange-500 absolute right-0 m-4 text-white'>
                <BiExit />
            </Button>
            <motion.div style={{ backgroundImage: `url(${logo})` }} className="cover relative bg-center bg-cover bg-no-repeat bg-white flex flex-col h-full items-center justify-center p-8">
                <div className='bg-black/45 w-full h-full absolute'></div>
                <motion.div className='h-[250px] flex justify-center items-center'>
                    <Image
                        isBlurred
                        radius="lg"
                        isZoomed
                        width={200}
                        height={200}
                        src={logo}
                        alt="I"
                        className="w-[150px]  lg:w-[250px]"
                    />
                </motion.div>
                <Spacer y={1} />
                <motion.h2 className="text-white text-center font-mono text-2xl z-20">
                    Editor
                </motion.h2>
            </motion.div>

            <motion.div className="formtag flex flex-col items-center justify-center mx-2 my-5 ">
                <Form />
            </motion.div>

        </motion.div>
    )
}
export default EditorWin