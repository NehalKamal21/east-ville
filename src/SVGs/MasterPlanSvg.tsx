import React, { useState } from 'react';
import '../master.css';
import { useNavigate } from "react-router-dom";
import '../Popover.css';
import img01 from "../assets/masterplan/image_1.png";
import img02 from "../assets/masterplan/image_2.png";
import img03 from "../assets/masterplan/image_3.png";
import img04 from "../assets/masterplan/image_4.png";
import img05 from "../assets/masterplan/image_5.png";
import img06 from "../assets/masterplan/image_6.png";
import img07 from "../assets/masterplan/image_7.png";
import img08 from "../assets/masterplan/image_8.png";
import img09 from "../assets/masterplan/image_9.png";
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
    points: { clusterId: string, x: number, y: number, label: string, availableUnits: number, totalVillas: number }[];
    selectedType: string;
    selectedArea: number;
}

const MasterPlanSvg: React.FC<MasterPlanSvgProps> = ({ points, selectedArea, selectedType }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState<string | null>(null);



    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const ClusterId = event.currentTarget.id; // Get the ID of clicked Cluster
        navigate('/clusterView/' + ClusterId); // Navigate to ClusterView page with the ClusterId
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1920" height="1217.25" viewBox="0 0 7680 4869" preserveAspectRatio='none' className='master-plan-svg'>
            <image id="Background" width="7680" height="4869" xlinkHref={img01} />
            <image
                x="2988" y="416" width="382" height="367" id="B-36"
                onMouseEnter={() => { setHovered('B-36'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img02}
            />
            <image x="3266" y="621" width="366" height="385" id="A-35"
                onMouseEnter={() => { setHovered('A-35'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img03}
            />
            <image x="3574" y="841" width="414" height="383" id="B-34"
                onMouseEnter={() => { setHovered('B-34'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img04}
            />
            <image x="3897" y="1066" width="276" height="279" id="TW-33"
                onMouseEnter={() => { setHovered('TW-33'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img05}
            />
            <image x="4080" y="1204" width="435" height="380" id="B-32"
                onMouseEnter={() => { setHovered('B-32'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img06}
            />
            <image x="3663" y="1413" width="463" height="382" id="B-37"
                onMouseEnter={() => { setHovered('B-37'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img07}
            />
            <image x="3481" y="1269" width="286" height="321" id="TW-38"
                onMouseEnter={() => { setHovered('TW-38'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img08}
            />
            <image x="3167" y="1036" width="410" height="390" id="B-39"
                onMouseEnter={() => { setHovered('B-39'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img09}
            />
            <image x="2855" y="805" width="438" height="394" id="A-40"
                onMouseEnter={() => { setHovered('A-40'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img10}
            />
            <image x="2607" y="634" width="356" height="299" id="B-41"
                onMouseEnter={() => { setHovered('B-41'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img11}
            />
            <image x="2169" y="788" width="430" height="373" id="B-46"
                onMouseEnter={() => { setHovered('B-46'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img12}
            />
            <image x="2474" y="991" width="378" height="401" id="A-45"
                onMouseEnter={() => { setHovered('A-45'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img13}
            />
            <image x="2778" y="1231" width="422" height="389" id="B-44"
                onMouseEnter={() => { setHovered('B-44'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img14}
            />
            <image x="3100" y="1466" width="285" height="297" id="TW-43"
                onMouseEnter={() => { setHovered('TW-43'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img15}
            />
            <image x="3288" y="1603" width="378" height="417" id="B-42"
                onMouseEnter={() => { setHovered('B-42'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img16}
            />
            <image x="1758" y="969" width="437" height="375" id="B-47"
                onMouseEnter={() => { setHovered('B-47'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img17}
            />
            <image x="2036" y="1195" width="446" height="405" id="A-48"
                onMouseEnter={() => { setHovered('A-48'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img18}
            />
            <image x="2341" y="1437" width="415" height="414" id="B-49"
                onMouseEnter={() => { setHovered('B-49'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img19}
            />
            <image x="2653" y="1687" width="292" height="318" id="TW-50"
                onMouseEnter={() => { setHovered('TW-50'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img20}
            />
            <image x="2787" y="1862" width="488" height="423" id="B-51"
                onMouseEnter={() => { setHovered('B-51'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img21}
            />
            <image x="6124" y="2202" width="302" height="328"
                onMouseEnter={() => { setHovered(''); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                xlinkHref={img22}
            />
            <image x="3322" y="235" width="253" height="269" id=""
                onMouseEnter={() => { setHovered(''); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                xlinkHref={img23}
            />
            <image x="3480" y="355" width="353" height="348" id="B-31"
                onMouseEnter={() => { setHovered('B-31'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img24}
            />
            <image x="3752" y="534" width="396" height="385" id="B-30"
                onMouseEnter={() => { setHovered('B-30'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img25}
            />
            <image x="4062" y="742" width="404" height="391" id="B-29"
                onMouseEnter={() => { setHovered('B-29'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img26}
            />
            <image x="4406" y="947" width="455" height="385" id="A-28"
                onMouseEnter={() => { setHovered('A-28'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img27}
            />
            <image x="4752" y="1174" width="428" height="414" id="B-27"
                onMouseEnter={() => { setHovered('B-27'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img28}
            />
            <image x="5085" y="1414" width="485" height="415" id="A-26"
                onMouseEnter={() => { setHovered('A-26'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img29}
            />
            <image x="5431" y="1684" width="455" height="431" id="B-25"
                onMouseEnter={() => { setHovered('B-25'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img30}
            />
            <image x="5803" y="1945" width="422" height="415" id="B-24"
                onMouseEnter={() => { setHovered('B-24'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img31}
            />
            <image x="4618" y="1577" width="456" height="393" id="B-23"
                onMouseEnter={() => { setHovered('B-23'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img32}
            />
            <image x="4981" y="1831" width="302" height="306" id="T-22"
                onMouseEnter={() => { setHovered('T-22'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img33}
            />
            <image x="5204" y="1989" width="305" height="320" id="T-21"
                onMouseEnter={() => { setHovered('T-21'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img34}
            />
            <image x="5409" y="2140" width="455" height="473" id="A-20"
                onMouseEnter={() => { setHovered('A-20'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img35}
            />
            <image x="5774" y="2456" width="557" height="430" id="B-19"
                onMouseEnter={() => { setHovered('B-19'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img36}
            />
            <image x="6367" y="2689" width="489" height="490" id="A-18"
                onMouseEnter={() => { setHovered('A-18'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img37}
            />
            <image x="4228" y="1782" width="428" height="463" id="B-13"
                onMouseEnter={() => { setHovered('B-13'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img38}
            />
            <image x="4571" y="2060" width="303" height="332" id="T-14"
                onMouseEnter={() => { setHovered('T-14'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img39}
            />
            <image x="4772" y="2225" width="512" height="444" id="A-15"
                onMouseEnter={() => { setHovered('A-15'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img40}
            />
            <image x="5166" y="2506" width="483" height="461" id="B-16"
                onMouseEnter={() => { setHovered('B-16'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img41}
            />
            <image x="5548" y="2806" width="545" height="481" id="B-17"
                onMouseEnter={() => { setHovered('B-17'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img42}
            />
            <image x="5974" y="3116" width="345" height="352" id="B-12+"
                onMouseEnter={() => { setHovered('B-12+'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img43}
            />
            <image x="3766" y="2039" width="509" height="413" id="B-11"
                onMouseEnter={() => { setHovered('B-11'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img44}
            />
            <image x="4168" y="2288" width="307" height="329" id="T-10"
                onMouseEnter={() => { setHovered('T-10'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img45}
            />
            <image x="4368" y="2449" width="446" height="420" id="A-09"
                onMouseEnter={() => { setHovered('A-09'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img46}
            />
            <image x="4749" y="2755" width="502" height="455" id="B-08"
                onMouseEnter={() => { setHovered('B-08'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img47}
            />
            <image x="5148" y="3051" width="474" height="498" id="A-07"
                onMouseEnter={() => { setHovered('A-07'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img48}
            />
            <image x="5574" y="3377" width="367" height="372" id="B-12"
                onMouseEnter={() => { setHovered('B-12'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img49}
            />
            <image x="3348" y="2262" width="405" height="482" id="A-01"
                onMouseEnter={() => { setHovered('A-01'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img50}
            />
            <image x="3711" y="2538" width="319" height="346" id="T-02"
                onMouseEnter={() => { setHovered('T-02'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img51}
            />
            <image x="3937" y="2714" width="315" height="355" id="T-03"
                onMouseEnter={() => { setHovered('T-03'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img52}
            />
            <image x="4147" y="2892" width="482" height="501" id="A-04"
                onMouseEnter={() => { setHovered('A-04'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img53}
            />
            <image x="4539" y="3211" width="500" height="489" id="B-05"
                onMouseEnter={() => { setHovered('B-05'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img54}
            />
            <image x="4930" y="3538" width="568" height="521" id="A-06"
                onMouseEnter={() => { setHovered('A-06'); }}
                onMouseLeave={() => setHovered(null)}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img55}
            />
            {points.map((point) => (
                hovered == point.clusterId && <g key={point.clusterId} className='cluster-point'>
                    {/* Clickable Circle */}
                    <foreignObject x={point.x + 10} y={point.y + 12} width="300" height="150">
                        <div className="popoverXXX">
                            <span>{point.clusterId}</span>

                        </div>
                    </foreignObject>
                </g>
            ))}
        </svg>

    );
};

export default MasterPlanSvg;