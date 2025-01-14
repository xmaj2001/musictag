import { motion } from 'framer-motion'
import { Button, Image, Spacer } from "@nextui-org/react"
import logo from "../assets/imgs/logo.jpeg"
import '../assets/css/style.css'
import { BiExit } from 'react-icons/bi'
import Form from '../components/Form'
import { useEffect, useState } from 'react'
import Itags from '../types/Itags'
import '../assets/css/style.css'
import { useLocation } from 'react-router'

function EditorWin() {
    const location = useLocation();
    const [tags, setTags] = useState<Itags | null>(null);
    const [load, setload] = useState<boolean>(true);
    const [path, setPath] = useState<string>("");
    useEffect(() => {
        const importTags = async () => {
            if (location.state) {
                const readtags = await window.electronAPI.readtags(location.state.file.path);
                setPath(location.state.file.path);
                setTags(readtags);
                setload(false)
            }
        }
        importTags();
    }, [location.state]);

    return (

        <motion.div className="pageeditor h-screen w-screen bg-white relative rounded-lg">
            <Button onClick={async () => await window.electronAPI.close()} isIconOnly className='bg-orange-500 absolute right-0 m-4 text-white'>
                <BiExit />
            </Button>

            <motion.div style={{ backgroundImage: `url(${tags?.coverBase64 ? tags?.coverBase64 : logo})` }} className="cover">
                <div className='bg-black/45 w-full h-full absolute'></div>
                <motion.div className='h-[250px] flex justify-center items-center'>
                    <Image
                        isBlurred
                        radius="lg"
                        isZoomed
                        width={200}
                        height={200}
                        src={tags?.coverBase64 ? tags?.coverBase64 : logo}
                        alt="I"
                        className="w-[150px] lg:w-[250px]"
                    />
                </motion.div>
                <Spacer y={1} />
                <motion.h2 className="text-white text-center font-mono text-xl z-20">
                    {load ? "..." : tags?.title ? tags?.title : "MusicTag"}
                </motion.h2>
            </motion.div>

            <motion.div className="formtag flex flex-col items-center justify-center mx-2 my-5 ">
                <Form tags={tags} file={path}/>
            </motion.div>
            {load ? <div className='bg-black/70 w-full h-full flex justify-center items-center absolute'>
                <h1 className="text-2xl text-center animationx">Carregando...</h1>
            </div> : null}
        </motion.div>

    )
}
export default EditorWin
