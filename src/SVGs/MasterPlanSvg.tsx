import React, { useEffect, useState } from 'react';
import '../master.css';
import { useNavigate } from "react-router-dom";
import '../Popover.css';
import img01 from "../assets/masterplan/image_01.png";
import img02 from "../assets/masterplan/image_02.png";
import img03 from "../assets/masterplan/image_03.png";
import img04 from "../assets/masterplan/image_04.png";
import img05 from "../assets/masterplan/image_05.png";
import img06 from "../assets/masterplan/image_06.png";
import img07 from "../assets/masterplan/image_07.png";
import img08 from "../assets/masterplan/image_08.png";
import img09 from "../assets/masterplan/image_09.png";
import img10 from "../assets/masterplan/image_10.png";
import img11 from "../assets/masterplan/image_11.png";
import img12 from "../assets/masterplan/image_12.png";
import img13 from "../assets/masterplan/image_13.png";
import img14 from "../assets/masterplan/image_14.png";
import img15 from "../assets/masterplan/image_15.png";
import img16 from "../assets/masterplan/image_16.png";
import img17 from "../assets/masterplan/image_17.png";
import img18 from "../assets/masterplan/image_18.png";
import img19 from "../assets/masterplan/image_19.png";
import img20 from "../assets/masterplan/image_20.png";
import img21 from "../assets/masterplan/image_21.png";
import img22 from "../assets/masterplan/image_22.png";
import img23 from "../assets/masterplan/image_23.png";
import img24 from "../assets/masterplan/image_24.png";
import img25 from "../assets/masterplan/image_25.png";
import img26 from "../assets/masterplan/image_26.png";
import img27 from "../assets/masterplan/image_27.png";
import img28 from "../assets/masterplan/image_28.png";
import img29 from "../assets/masterplan/image_29.png";
import img30 from "../assets/masterplan/image_30.png";
import img31 from "../assets/masterplan/image_31.png";
import img32 from "../assets/masterplan/image_32.png";
import img33 from "../assets/masterplan/image_33.png";
import img34 from "../assets/masterplan/image_34.png";
import img35 from "../assets/masterplan/image_35.png";
import img36 from "../assets/masterplan/image_36.png";
import img37 from "../assets/masterplan/image_37.png";
import img38 from "../assets/masterplan/image_38.png";
import img39 from "../assets/masterplan/image_39.png";
import img40 from "../assets/masterplan/image_40.png";
import img41 from "../assets/masterplan/image_41.png";
import img42 from "../assets/masterplan/image_42.png";
import img43 from "../assets/masterplan/image_43.png";
import img44 from "../assets/masterplan/image_44.png";
import img45 from "../assets/masterplan/image_45.png";
import img46 from "../assets/masterplan/image_46.png";
import img47 from "../assets/masterplan/image_47.png";
import img48 from "../assets/masterplan/image_48.png";
import img49 from "../assets/masterplan/image_49.png";
import img50 from "../assets/masterplan/image_50.png";
import img51 from "../assets/masterplan/image_51.png";
import img52 from "../assets/masterplan/image_52.png";
import img53 from "../assets/masterplan/image_53.png";
import img54 from "../assets/masterplan/image_54.png";
import img55 from "../assets/masterplan/image_55.png";

interface MasterPlanSvgProps {
    points: { clusterId: string, x: number, y: number, label: string, availableUnits: number }[];
}

const MasterPlanSvg: React.FC<MasterPlanSvgProps> = ({ points }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState<string | null>(null);


    useEffect(() => {
        console.log(hovered)
    }, [hovered])
    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const ClusterId = event.currentTarget.id; // Get the ID of clicked Cluster
        navigate('/clusterView/' + ClusterId); // Navigate to ClusterView page with the ClusterId
    };

    return (
        <svg className='fullScreenSvg' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="640" height="427" viewBox="0 0 640 427" preserveAspectRatio='none'>

            <image id="Layer_0" data-name="Layer 0" width="640" height="427" xlinkHref={img01} />

            <image id="B-47" onMouseEnter={() => { setHovered('B-47'); }}
                onMouseLeave={() => setHovered(null)} onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="155" y="66" width="41" height="36" xlinkHref={img02} />
            <image id="A-48" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="174" y="85" width="41" height="38" xlinkHref={img03} />
            <image id="B-49" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="192" y="105" width="41" height="43" xlinkHref={img04} />
            <image id="TW-50" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="213" y="127" width="31" height="34" xlinkHref={img05} />
            <image id="B-51" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="222" y="142" width="45" height="43" xlinkHref={img06} />
            <image id="B-42" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="270" y="125" width="37" height="44" xlinkHref={img07} />
            <image id="TW-43" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="257" y="113" width="31" height="33" xlinkHref={img08} />
            <image id="B-44" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="235" y="91" width="40" height="42" xlinkHref={img09} />
            <image id="A-45" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="214" y="73" width="37" height="40" xlinkHref={img10} />
            <image id="B-46" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="193" y="54" width="41" height="38" xlinkHref={img11} />
            <image id="B-41" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="233" y="46" width="35" height="35" xlinkHref={img12} />
            <image id="A-40" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="250" y="62" width="42" height="39" xlinkHref={img13} />
            <image id="B-39" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="271" y="80" width="41" height="42" xlinkHref={img14} />
            <image id="TW-38" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="293" y="101" width="31" height="33" xlinkHref={img15} />
            <image id="B-37" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="306" y="114" width="46" height="41" xlinkHref={img16} />
            <image id="B-36" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="269" y="32" width="39" height="38" xlinkHref={img17} />
            <image id="A-35" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="289" y="49" width="37" height="41" xlinkHref={img18} />
            <image id="B-34" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="311" y="68" width="39" height="40" xlinkHref={img19} />
            <image id="TW-33" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="334" y="88" width="31" height="32" xlinkHref={img20} />
            <image id="B-32" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="347" y="99" width="42" height="42" xlinkHref={img21} />
            <image id="unkown" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa' x="299" y="21" width="28" height="30" xlinkHref={img22} />
            <image id="B-31" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="313" y="30" width="35" height="36" xlinkHref={img23} />
            <image id="B-30" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="333" y="46" width="38" height="38" xlinkHref={img24} />
            <image id="B-29" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="355" y="64" width="39" height="39" xlinkHref={img25} />
            <image id="A-28" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="380" y="82" width="44" height="40" xlinkHref={img26} />
            <image id="B-27" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="405" y="103" width="42" height="41" xlinkHref={img27} />
            <image id="A-26" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="431" y="123" width="46" height="42" xlinkHref={img28} />
            <image id="B-25" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="456" y="147" width="45" height="46" xlinkHref={img29} />
            <image id="B-24" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="484" y="171" width="43" height="43" xlinkHref={img30} />
            <image id="unkown" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa' x="509" y="194" width="34" height="36" xlinkHref={img31} />
            <image id="B-23" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="387" y="132" width="45" height="44" xlinkHref={img32} />
            <image id="T-22" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="414" y="155" width="33" height="35" xlinkHref={img33} />
            <image id="T-21" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="430" y="169" width="34" height="36" xlinkHref={img34} />
            <image id="A-20" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="446" y="184" width="44" height="47" xlinkHref={img35} />
            <image id="B-19" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="472" y="212" width="55" height="48" xlinkHref={img36} />
            <image id="A-18" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="522" y="238" width="49" height="51" xlinkHref={img37} />
            <image id="B-18" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="477" y="269" width="38" height="40" xlinkHref={img38} />
            <image id="B-17" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="445" y="240" width="53" height="50" xlinkHref={img39} />
            <image id="A-15" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="387" y="185" width="49" height="48" xlinkHref={img40} />
            <image id="B-16" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="415" y="211" width="48" height="50" xlinkHref={img41} />
            <image id="T-14" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="371" y="171" width="33" height="36" xlinkHref={img42} />
            <image id="B-13" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="349" y="146" width="39" height="46" xlinkHref={img43} />
            <image id="B-11" className='villa-B' onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} x="303" y="163" width="48" height="43" xlinkHref={img44} />
            <image id="T-10" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="332" y="185" width="33" height="36" xlinkHref={img45} />
            <image id="A-09" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="346" y="200" width="43" height="50" xlinkHref={img46} />
            <image id="B-08" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="374" y="229" width="48" height="48" xlinkHref={img47} />
            <image id="A-07" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="403" y="256" width="46" height="54" xlinkHref={img48} />
            <image id="B-12" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="436" y="286" width="38" height="41" xlinkHref={img49} />
            <image id="A-01" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="241" y="173" width="56" height="52" xlinkHref={img50} />
            <image id="T-02" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="275" y="203" width="44" height="36" xlinkHref={img51} />
            <image id="T-03" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-TW' x="299" y="219" width="40" height="36" xlinkHref={img52} />
            <image id="A-04" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="315" y="237" width="48" height="48" xlinkHref={img53} />
            <image id="B-05" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-B' x="341" y="267" width="50" height="50" xlinkHref={img54} />
            <image id="A-06" onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} className='villa-A' x="375" y="297" width="52" height="47" xlinkHref={img55} />
            {points.map((point) => (
                <g key={point.clusterId}>
                    {/* Clickable Circle */}
                    <foreignObject x={point.x + 10} y={point.y + 12} width="20" height="15">
                        <div className="popoverXXX">
                            <span>{point.clusterId}</span>
                            <br />
                            <span className='availableUnits'>{point.availableUnits} villas </span>
                        </div>
                    </foreignObject>
                </g>
            ))}
        </svg>

    );
};

export default MasterPlanSvg;