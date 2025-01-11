import { motion } from 'framer-motion'
import { Button, Card, Image, Link, Spacer } from "@nextui-org/react"
import logo from "../assets/imgs/logo.jpeg"
import { FaUpload } from 'react-icons/fa'
import '../assets/css/style.css'
import { SiGithub } from 'react-icons/si'
import { BiExit } from 'react-icons/bi'

function HomeWin() {
    return (
        <motion.div className="h-screen w-screen bg-white relative rounded-lg">
            <Button isIconOnly className='bg-orange-500 absolute right-0 m-4 text-white'>
                <BiExit/>
            </Button>
            <div className="pagehome justify-around bg-transparent items-center h-screen w-screen flex flex-row">
                <div className="sobre">
                    <motion.h1 className='text-4xl my-4 tag'><b className='anitag'>TAG</b><span className=''>Editor</span></motion.h1>
                    <motion.h2 className='animationx'>Editor de Etiqueta</motion.h2>
                    <hr className="my-2 hidden md:block" />
                    <p className="text-left my-5">
                        <p>
                            E uma <strong>ferramenta </strong> que permite a{" "}
                            <strong>edição de etiquetas de música</strong>, oferecendo uma maneira fácil de{" "}
                            <strong>organizar e gerenciar informações importantes</strong> relacionadas às suas músicas.
                        </p>
                        <Spacer y={1} />
                        <p>
                            Com ela você pode <strong>personalizar e aprimorar</strong> as etiquetas das suas músicas como{" "}
                            <strong>título</strong>, <strong>artista</strong>, <strong>álbum</strong>, <strong>ano de lançamento</strong>,{" "}
                            <strong>gênero</strong>, <strong>compositor</strong>, <strong>grupo</strong>, <strong>BPM</strong>,{" "}
                            <strong>copyright</strong> {""}
                            adicionar, remover ou atualizar a  <strong> capa (cover)</strong> da música.
                        </p>
                    </p>
                    <Link href="/editor">
                        <Button className="bg-orange-500 hover:bg-white hover:text-orange-500 mx-2 hidden md:flex">
                            <FaUpload /> Upload File
                        </Button>
                    </Link>

                    <Link href="https://github.com/xmaj2001/MusicDetails/archive/refs/tags/v1.0.0.zip">
                        <Button className="bg-white hover:bg-zinc-950 hover:text-white hidden md:flex text-orange-500 mx-2" >
                            <SiGithub /> Github
                        </Button>
                    </Link>
                </div>

                <motion.div initial={{ scale: 0.93 }} animate={{ scale: 1 }} transition={{ duration: 5, type: "tween", repeatType: "mirror", repeat: Infinity }} className="logo">
                    <Image isBlurred src={logo} width={240} height={240}
                        className="" />
                    <h3 className='animationlogo'>MusicTag</h3>
                </motion.div>
            </div>
        </motion.div>
    )
}
export default HomeWin