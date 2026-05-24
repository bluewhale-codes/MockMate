import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { cn } from './utils';
import TypographyPanel from '../../pages/DashBoard/Components/TypographyPanel';
import { useSelector , useDispatch } from 'react-redux';
import FloatingToolbar from '../../pages/DashBoard/Components/FloatingToolbar';
import { setElementID } from '../../store/slice/panelSlice';
import gsap from "gsap";
import WaveText from '../animated-headings/WaveText';
import SlideReveal from '../animated-headings/SlideReveal';
import LiquidDistortion from '../animated-headings/LiquidDistortion';
import { animations } from '../animated-headings/animation';
// Helper component for navigation links
const NavLink = ({ href, children }) => (
  
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

const fontMap = {
  inter: "Inter, sans-serif",
  poppins: "Poppins, sans-serif",
  outfit: "Outfit, sans-serif",
  space: "Space Grotesk, sans-serif",
  dmSans: "DM Sans, sans-serif",
  manrope: "Manrope, sans-serif",
  jakarta: "Plus Jakarta Sans, sans-serif",
  urbanist: "Urbanist, sans-serif",
  sora: "Sora, sans-serif",
  workSans: "Work Sans, sans-serif",

  playfair: "Playfair Display, serif",
  merriweather: "Merriweather, serif",
  lora: "Lora, serif",
  baskerville: "Libre Baskerville, serif",
  crimson: "Crimson Text, serif",

  bebas: "Bebas Neue, sans-serif",
  anton: "Anton, sans-serif",
  oswald: "Oswald, sans-serif",
  raleway: "Raleway, sans-serif",
  cabin: "Cabin, sans-serif",
};


// The main reusable Hero Section component
export const MinimalistHero = ({
  
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}) => {
    
    const [elements, setElements] = useState([
            {
              id: "heading",
              type: "h1",
              content: "Vishal Shakya",
              styles: {
                fontsize: 50,
                selectedColor: "#000000",
                fontFamily: "Poppins",
                fontWeight:900,
                animation:"SlideReveal",
                shadow:{
                  x:0,y:-12,z:0,blur:40,color:"#EC4899",opacity:100,preset:"strong"
                }
              },

            },
            {
              id: "name",
              type: "p",
              content: "Software Engineer",
              styles: {
                fontsize: 30,
                selectedColor: "#555",
                fontFamily: "Inter",
                fontWeight:500
              },
            },
    ]);

    const dispatch = useDispatch();
      



     const [text , setText] = useState("Vishal Shakya");
     const [heading,setHeading] = useState("Software Engineer");
     const [size , setSize] = useState(50);
     const [color,setColor] = useState('#030303');
     const [weight,setWeight] = useState(900);
     const [elementId,setElementId] =useState("heading");

     const setID = (id) =>{
          setElementId(id);
     }
    
     const [image, setImage] = useState("");
     const [menu, setMenu] = useState({
                            visible: false,
                            x: 0,
                            y: 0,
                            });

     const [panel,setPanel] = useState(false);
      
     const paneltoggle = ()=>{
      
          setPanel(!panel);
     }
     const fileInputRef = useRef();

     const {Textdata} = useSelector((state)=>state.panelSlice);

      const save =  async () =>{
            console.log("save");
            const data ={
                  heading:heading,
                  text:text
            }
             try {
            const res = await axios.post("http://localhost:3000/save-Herodata",data);
            console.log(res.data);
            
          } catch (error) {
              console.log(error.response.data);
          }
     
      }
     const getData = async () =>{
          try {
            const res = await axios.get("http://localhost:3000/get-data");
            console.log(res.data);
            setHeading(res.data.data.Heading);
            setText(res.data.data.Text);
          } catch (error) {
              console.log(error.response.data);
          }
     }

     useEffect(()=>{
         getData();
     },[])

     useEffect(()=>{

         
        Object.keys(Textdata).forEach((key)=>{

            setElements((prev) =>
              prev.map((el) =>
                el.id === Textdata.id
                  ? {
                      ...el,
                      styles: {
                        ...el.styles,
                        [key]: Textdata[key],
                      },
                    }
                  : el
              )
            );


        })
            
      
         
     },[Textdata])

     const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl); // ✅ instant preview
  }
};
  const text1 = useRef([]);
  const text2 = useRef([]);
  const text3 = useRef([]);
  const text4 = useRef([]);
  const text5 = useRef([]);

  const myHeading = "FULLSTACK DEVELOPER";

  useEffect(() => {
    // 1. Wave Animation
    gsap.to(text1.current, {
      y: -20,
      duration: 0.6,
      stagger: 0.05,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 2. Horizontal Slide
    gsap.fromTo(
      text2.current,
      { x: -30, opacity: 0.3 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.04,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      }
    );

    // 3. Scale Pulse
    gsap.to(text3.current, {
      scale: 1.3,
      stagger: 0.06,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "back.inOut(2)",
    });

    // 4. Rotation Animation
    gsap.to(text4.current, {
      rotation: 15,
      y: -10,
      stagger: 0.05,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
      transformOrigin: "center bottom",
    });

    // 5. Smooth Fade Up
    gsap.fromTo(
      text5.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        repeat: -1,
        yoyo: true,
        duration: 0.7,
        ease: "expo.inOut",
      }
    );
  }, []);

  const renderText = (ref) => 
    myHeading.split("").map((char, index) => (
      <span
        key={index}
        ref={(el) => (ref.current[index] = el)}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

    
  return (
    <div>
  {/* Teal Glow Background */}
  
  <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8  md:p-12',
        className
      )}
    >
      {/* Header */}
      <div className='flex h-[40px]'>
         {/* <button onClick={save} className='px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:scale-105 transition-transform duration-200'>Save</button> */}
         <div className='relative'> 
            {/* <FloatingToolbar  toggle={paneltoggle}/>
            {panel && elements.map((e)=>{
                  if(e.id === elementId){
                    return <TypographyPanel
                          id={elementId} 
                          color={e.styles.selectedColor}
                          size={e.styles.fontsize}
                          weight={e.styles.fontWeight}
            
                     /> 
                  }         
            })
                     
            } */}
            
             
         </div>
      </div>
      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          {elements.map((e)=>{

             if(e.id==="name"){
              return <h1
              style={{color:`${e.styles.selectedColor}`,fontWeight:`${e.styles.fontWeight}`,fontSize:`${e.styles.fontsize}px`,
                      fontFamily:fontMap[e.styles.fontFamily],
                       textShadow:`${e.styles?.shadow?.x}px ${-e.styles?.shadow?.y}px ${e.styles?.shadow?.blur}px  ${e.styles?.shadow?.color}`
            }}
              id='name'  onBlur={(e)=>setText(e.currentTarget.innerText)} onClick={(e)=>dispatch(setElementID(e.currentTarget.id))} contentEditable
  suppressContentEditableWarning
  className="font-extrabold text-foreground text-center ">

                {animations.map((animation)=>{
                   return <>
                       {animation.id === e.styles.animation && <animation.content text={text}/>}
                  </>
                })}
    
    </h1>
             }
          })}

          {/* <div className="flex flex-col gap-10 bg-black p-10"> */}
      
     
      {/* <svg
        width="220"
        height="120"
        viewBox="0 0 220 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        
        <path
          d="M150 22
             C165 35, 180 45, 175 60
             C170 72, 150 70, 148 58
             C145 45, 170 40, 190 55
             C205 68, 212 78, 205 95"
          stroke="#D7FF00"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="2 10"
          opacity="0.35"
          fill="none"
        />

       
        <g transform="translate(30 10)">
          <path
            d="M0 30 L55 0 L25 55 L22 35 L0 30Z"
            stroke="#D7FF00"
            strokeWidth="3"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          <path
            d="M22 35 L55 0"
            stroke="#D7FF00"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M22 35 L25 55"
            stroke="#D7FF00"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </svg>

      
      <svg
        width="420"
        height="120"
        viewBox="0 0 420 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        
        <text
          x="10"
          y="70"
          fill="#D7FF00"
          fontSize="64"
          fontFamily="cursive"
          fontWeight="500"
          transform="rotate(-2 120 60)"
        >
          amazing
        </text>

        
        <path
          d="M55 88 C140 92, 210 92, 315 88"
          stroke="#6D28FF"
          strokeWidth="8"
          strokeLinecap="round"
        />

        
        <circle
          cx="340"
          cy="85"
          r="5"
          fill="#6D28FF"
        />

        
        <path
          d="M352 28 L356 10"
          stroke="#6D28FF"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M368 34 L378 18"
          stroke="#6D28FF"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M386 42 L402 38"
          stroke="#6D28FF"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg> */}
    
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            ></motion.div>
            <motion.img
                src={image || imageSrc}
               
                onContextMenu={(e) => {
                    e.preventDefault()
                     e.stopPropagation(); // prevent global close

                    setMenu({
                    visible: true,
                    x: e.clientX,
                    y: e.clientY,
                    });
                
                } }
                alt={imageAlt}
                className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target ;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
              {/* {menu.visible && (
                    <TypographyPanel/>
                    
                )} */}
        </div>
        

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          

         {elements.map((e)=>{
             if(e.id==="heading"){

               
               return    <h1
          id="heading"
          onClick={(e)=>dispatch(setElementID(e.currentTarget.id))}
           style={{color:`${e.styles.selectedColor}`,fontWeight:`${e.styles.fontWeight}`,fontSize:`${e.styles.fontsize}px`
                   , fontFamily:fontMap[e.styles.fontFamily],
                     textShadow:`${e.styles.shadow.x}px ${-e.styles.shadow.y}px ${e.styles.shadow.blur}px  ${e.styles.shadow.color}`
        
          
          
          }}
          contentEditable
          suppressContentEditableWarning
          onBlur={(e)=>setHeading(e.currentTarget.innerText)} 
         //className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl"
         className="font-extrabold text-foreground text-center"
         >
             {animations.map((animation)=>{
                  return <>
                       {animation.id === e.styles.animation && <animation.content text={heading}/>}
                  </>
             })}
            {/* <LiquidDistortion text={heading}/> */}
            
          </h1>
             }
         })}
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
          {/* <div className="flex items-center justify-center min-h-screen bg-gray-100"> */}
      {/* <div className="relative w-[320px] h-[320px]"> */}
        
        {/* Torn Border SVG */}
        {/* <svg
          viewBox="0 0 300 300"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          
          <path
            d="
              M150 8
              C175 12, 200 18, 225 28
              C248 38, 270 55, 283 78
              C292 98, 296 123, 292 150
              C288 178, 279 202, 264 224
              C246 247, 225 264, 198 276
              C173 288, 145 292, 118 286
              C90 280, 66 269, 46 250
              C26 232, 14 208, 9 181
              C4 154, 5 127, 13 101
              C22 73, 37 51, 58 35
              C80 20, 104 11, 150 8
              Z
            "
            fill="white"
          />

        
          <path
            d="
              M150 28
              C172 30, 196 38, 216 48
              C235 58, 252 74, 263 93
              C271 112, 275 132, 272 151
              C268 173, 260 193, 247 210
              C231 229, 212 244, 190 254
              C168 264, 144 267, 121 263
              C98 259, 78 250, 61 236
              C45 220, 34 201, 28 180
              C23 159, 22 136, 27 115
              C33 91, 45 72, 61 58
              C79 44, 98 35, 150 28
              Z
            "
            fill="#5B21F5"
          />
        </svg> */}

        {/* Image */}
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="phone"
            className="w-[180px] object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div> */}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
          
        </motion.div>
      </footer>

      <div>
        
      </div>
    </div>
</div>
  );
};