import {useState , useEffect}  from "react";
import { ArrowDownRight } from "@aliimam/icons"; 
import { Button } from "./Button";
import FloatingToolbar from "../../pages/DashBoard/Components/FloatingToolbar";
import TypographyPanel from "../../pages/DashBoard/Components/TypographyPanel";
import { useSelector,useDispatch } from "react-redux";
import { setElementID } from "../../store/slice/panelSlice";
import { animations } from "../animated-headings/animation";
  const Elements = [
  {
    id: "h1-1",
    type: "h1",
    content: "FULLSTACK DEVELOPER",
    styles: {
      fontSize: 100,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 900,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-1",
    type: "p",
    content: "1,996",
    styles: {
      fontSize: 14,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 500,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-2",
    type: "p",
    content: "VISHAL SHAKYA",
    styles: {
      fontSize: 36,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 300,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-3",
    type: "p",
    content: "VISHAL SHAKYA",
    styles: {
      fontSize: 36,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 300,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-4",
    type: "p",
    content: "/ ART DIRECTION / WEB DESIGN (UX/UI) / WEB DEVELOPMENT",
    styles: {
      fontSize: 20,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 600,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-5",
    type: "p",
    content: "BASED IN BOKARO STEEL CITY",
    styles: {
      fontSize: 12,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 500,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-6",
    type: "p",
    content: "BASED IN BOKARO STEEL CITY",
    styles: {
      fontSize: 12,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 500,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-7",
    type: "p",
    content:
      "I'M EXPERIENCED WEB AND UX/UI DESIGNER, WHO DESIGN MEMORABLE WEB EXPERIENCES FOR BRANDS OF ALL SIZES",
    styles: {
      fontSize: 16,
      selectedColor: "#000000",
      fontFamily: "monospace",
      fontWeight: 500,
      animation:"SlideReveal"
    },
  },

  {
    id: "p-8",
    type: "p",
    content: "RECENT WORK",
    styles: {
      fontSize: 18,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 500,
      animation:"SlideReveal"
    },
  },

  {
    id: "h2-1",
    type: "h2",
    content: "Design without Limits",
    styles: {
      fontSize: 48,
      selectedColor: "#000000",
      fontFamily: "Poppins",
      fontWeight: 700,
      animation:"SlideReveal"
    },
  },

  {
    id: "img-1",
    type: "img",
    content:
      "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg",
    styles: {
      width: "100%",
      height: "auto",
    },
  },

  {
    id: "img-2",
    type: "img",
    content:
      "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg",
    styles: {
      width: "100%",
      height: "auto",
    },
  },

  {
    id: "img-3",
    type: "img",
    content:
      "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg",
    styles: {
      width: "100%",
      height: "auto",
    },
  },

  {
    id: "img-4",
    type: "img",
    content:
      "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg",
    styles: {
      width: "100%",
      height: "auto",
    },
  },

  {
    id: "img-5",
    type: "img",
    content:
      "https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg",
    styles: {
      width: "100%",
      height: "auto",
    },
  },
];
export function HeroSection04() {
    const [selectedId, setID] = useState(null);
    const [panel,setPanel] = useState(false);

    const [elements , setElements] = useState(Elements)
    const dispatch = useDispatch();

    const {Textdata} = useSelector((state)=>state.panelSlice);
      
     const paneltoggle = ()=>{
      
          setPanel(!panel);
     }


  const getElement = (id) => elements.find((el) => el.id === id);

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
  return (
    <section style={{
        
    }} className="min-h-screen overflow-hidden relative py-20">
      <div className='relative'> 
                  {/* <FloatingToolbar  toggle={paneltoggle}/>
                  {panel && elements.map((e)=>{
                        if(e.id === selectedId){
                          return <TypographyPanel
                                id={selectedId} 
                                color={e.styles.selectedColor}
                                size={e.styles.fontsize}
                                weight={e.styles.fontWeight}
                  
                           /> 
                        }         
                  })
                           
                  } */}
                   
               </div>
      <div className="mx-auto max-w-7xl relative z-20 px-6">
        <div className="relative ">
         <p
            style={{
              color: getElement("p-1").styles.selectedColor,
              fontWeight: getElement("p-1").styles.fontWeight,
              fontSize: `${getElement("p-1").styles.fontsize}px`,
              fontFamily: getElement("p-1").styles.fontFamily,
            }}
            onClick={(e) =>dispatch(setElementID("p-1"))}
            contentEditable
            suppressContentEditableWarning
            className="text-sm absolute -top-4 left-20 tracking-wider"
          >{animations.map((animation)=>{
                              const text = getElement("p-1").content
                              return <>
                                   {animation.id === getElement("p-1").styles.animation && <animation.content text={text}/>}
              </>
              })}
                
          </p>

           {/* h1-1 */}
          <h1
            style={{
              color: getElement("h1-1").styles.selectedColor,
              fontWeight: getElement("h1-1").styles.fontWeight,
              fontSize: `${getElement("h1-1").styles.fontsize}px`,
              fontFamily: getElement("h1-1").styles.fontFamily,
            }}
            onClick={(e) =>dispatch(setElementID("h1-1"))}
            contentEditable
            suppressContentEditableWarning
            className="z-20  text-center tracking-[-7px]"
          >
            {getElement("h1-1").content}
          </h1>

        {/* p-2 */}
          <p
            style={{
              color: getElement("p-2").styles.selectedColor,
              fontWeight: getElement("p-2").styles.fontWeight,
              fontSize: `${getElement("p-2").styles.fontsize}px`,
              fontFamily: getElement("p-2").styles.fontFamily,
            }}
            onClick={() => dispatch(setElementID("p-2"))}
            contentEditable
            suppressContentEditableWarning
            className="hidden z-50 xl:block absolute -bottom-12 right-24"
          >
            {getElement("p-2").content}
          </p>
          {/* p-3 */}
          <p
            style={{
              color: getElement("p-3").styles.selectedColor,
              fontWeight: getElement("p-3").styles.fontWeight,
              fontSize: `${getElement("p-3").styles.fontsize}px`,
              fontFamily: getElement("p-3").styles.fontFamily,
            }}
            onClick={() => dispatch(setElementID("p-3"))}
            contentEditable
            suppressContentEditableWarning
            className="fixed z-50 absolute xl:hidden -bottom-12 left-24"
          >
            {getElement("p-3").content}
          </p>

        </div>

        <div className="grid relative">
          <div className="space-y-8 pt-20 flex gap-6 justify-center">
            <div className="flex gap-6 bg-secondary w-full max-w-xl h-fit p-10 items-end space-y-2 text-xl font-bold md:text-2xl lg:text-3xl">
              <div className="font-semibold text-xl">
                <div>/ ART DIRECTION</div>
                <div>/ WEB DESIGN (UX/UI)</div>
                <div>/ WEB DEVELOPMENT</div>
              </div>
              <div className="absolute hidden  md:flex left-1/2 -top-10 w-fit overflow-hidden bg-secondary">
                <img
                  src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg"
                  alt="Designer portrait"
                  className="h-100 w-full object-contain grayscale"
                />
                  <div
            style={{
              color: getElement("p-5").styles.selectedColor,
              fontSize: `${getElement("p-5").styles.fontsize}px`,
            }}
            contentEditable
            suppressContentEditableWarning
            onClick={() => dispatch(setElementID("p-5"))}
            className="text-left p-2 rotate-180 [writing-mode:vertical-rl]"
          >
            {getElement("p-5").content}
          </div>

              </div>
            </div>
          </div>
          <div className="flex md:hidden left-1/2 -top-10 w-full md:w-fit overflow-hidden bg-secondary">
            <img
              src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/ai.jpg"
              alt="Designer portrait"
              className="h-100 w-full object-contain grayscale"
            />
            <div
            style={{
              color: getElement("p-5").styles.selectedColor,
              fontSize: `${getElement("p-5").styles.fontsize}px`,
            }}
            contentEditable
            suppressContentEditableWarning
            onClick={() => dispatch(setElementID("p-5"))}
            className="text-left p-2 rotate-180 [writing-mode:vertical-rl]"
          >
            {getElement("p-5").content}
          </div>

          </div>
        </div>

         {/* p-7 */}
        <div className="md:mt-40 mt-10">
          <p
            style={{
              color: getElement("p-7").styles.selectedColor,
              fontSize: `${getElement("p-7").styles.fontsize}px`,
              fontFamily: getElement("p-7").styles.fontFamily,
            }}
            contentEditable
            suppressContentEditableWarning
            onClick={() => dispatch(setElementID("p-7"))}
            className="mx-auto max-w-2xl text-center"
          >
            {getElement("p-7").content}
          </p>
        </div>
        <div className="flex justify-center pt-6">
        <Button size={"lg"}>Book a call</Button>
        </div>

        <div className="md:flex mt-20 items-end justify-between">
          <div className="relative">
            <div className="w-60 h-36 shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-6 -top-6  shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-60 h-36 absolute left-12 -top-12  shadow-lg border rounded-md overflow-hidden mb-8 md:mb-0">
              <img
                src="https://raw.githubusercontent.com/aliimam-in/aliimam/refs/heads/main/apps/www/public/templates/dalim-www.jpg"
                alt="Portfolio"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center md:justify-end gap-2">
              {/* p-8 */}
        <span
          style={{
            color: getElement("p-8").styles.selectedColor,
            fontSize: `${getElement("p-8").styles.fontsize}px`,
          }}
          contentEditable
          suppressContentEditableWarning
          onClick={() => dispatch(setElementID("p-8"))}
          className="text-lg tracking-wider"
        >
          {getElement("p-8").content}
        </span>
              <ArrowDownRight className="size-6" />
            </div>

            <div className="mt-3 md:text-right">
              <h2
          style={{
            color: getElement("h2-1").styles.selectedColor,
            fontSize: `${getElement("h2-1").styles.fontsize}px`,
          }}
          contentEditable
          suppressContentEditableWarning
          onClick={() => dispatch(setElementID("h2-1"))}
          className="uppercase"
        >
          {getElement("h2-1").content}
        </h2>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute block dark:hidden inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
        linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        className="absolute hidden dark:block inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #404040 1px, transparent 1px),
        linear-gradient(to bottom, #404040 1px, transparent 1px)
      `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </section>
  );
}