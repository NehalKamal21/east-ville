import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        const ClusterId = event.currentTarget.id; // Get the ID of clicked Cluster
        navigate('/clusterView/' + ClusterId); // Navigate to ClusterView page with the ClusterId
    };

    const handleMouseEnter = (clusterId: string, event: React.MouseEvent<SVGImageElement, MouseEvent>) => {
        setHovered(clusterId);

        // Get mouse position relative to the SVG
        const svg = event.currentTarget.ownerSVGElement;
        if (svg) {
            const rect = svg.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            // Convert to SVG coordinates
            const pt = svg.createSVGPoint();
            pt.x = x;
            pt.y = y;
            const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());

            // Ensure tooltip stays within viewport bounds
            const tooltipWidth = 200;
            const tooltipHeight = 80;
            const svgWidth = svg.viewBox.baseVal.width;
            const svgHeight = svg.viewBox.baseVal.height;

            // Position tooltip to the right and above the mouse cursor
            let tooltipX = svgP.x + 50;
            let tooltipY = svgP.y - 100;

            // Adjust if tooltip would go outside right edge
            if (tooltipX + tooltipWidth > svgWidth) {
                tooltipX = svgP.x - tooltipWidth - 20;
            }

            // Adjust if tooltip would go outside left edge
            if (tooltipX < 0) {
                tooltipX = 20;
            }

            // Adjust if tooltip would go outside top edge
            if (tooltipY < 0) {
                tooltipY = svgP.y + 30;
            }

            // Adjust if tooltip would go outside bottom edge
            if (tooltipY + tooltipHeight > svgHeight) {
                tooltipY = svgP.y - tooltipHeight - 20;
            }

            setMousePosition({ x: tooltipX, y: tooltipY });
        }
    };

    const handleMouseLeave = () => {
        setHovered(null);
        setMousePosition(null);
    };

    const handle360IconClick = (event: React.MouseEvent) => {
        // Prevent event bubbling to avoid multiple clicks
        event.preventDefault();
        event.stopPropagation();
        
        // Get the clicked element to determine which icon was clicked
        const target = event.currentTarget as HTMLElement;
        const iconId = target.id; // Get the icon ID (e.g., "360-A", "360-B", etc.)
        
        console.log('360 icon clicked:', iconId); // Debug log
        
        if (iconId && iconId.startsWith('360-')) {
            // Extract the letter from the icon ID (e.g., "A" from "360-A")
            const letter = iconId.split('-')[1];
            
            // Create panorama configuration with the icon ID
            const panoramaConfig = {
                iconId: iconId,
                clusterId: letter, // Use the letter as cluster ID
                floorId: 'groundFloor', // Default floor
                location: 'location1' // Default location
            };
            
            console.log('Navigating to panorama with config:', panoramaConfig); // Debug log
            
            // Store panorama configuration in localStorage for the viewer to use
            localStorage.setItem('panoramaConfig', JSON.stringify(panoramaConfig));
            
            // Navigate to exterior panorama viewer (from master plan)
            navigate('/exterior');
        } else {
            console.log('360 icon clicked with ID:', iconId);
        }
    };

    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1920" height="1217.25" viewBox="0 0 7680 4869" preserveAspectRatio='none' className='master-plan-svg'>
            <image id="Background" width="7680" height="4869" xlinkHref={img01} onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)} />

            <image
                x="2988" y="416" width="382" height="367" id="B-36"
                onMouseEnter={(event) => handleMouseEnter('B-36', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event: React.MouseEvent<SVGImageElement, MouseEvent>) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img02}
            />
            <image x="3266" y="621" width="366" height="385" id="A-35"
                onMouseEnter={(event) => handleMouseEnter('A-35', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img03}
            />
            <image x="3574" y="841" width="414" height="383" id="B-34"
                onMouseEnter={(event) => handleMouseEnter('B-34', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img04}
            />
            <image x="3897" y="1066" width="276" height="279" id="TW-33"
                onMouseEnter={(event) => handleMouseEnter('TW-33', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img05}
            />
            <image x="4080" y="1204" width="435" height="380" id="B-32"
                onMouseEnter={(event) => handleMouseEnter('B-32', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img06}
            />
            <image x="3663" y="1413" width="463" height="382" id="B-37"
                onMouseEnter={(event) => handleMouseEnter('B-37', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img07}
            />
            <image x="3481" y="1269" width="286" height="321" id="TW-38"
                onMouseEnter={(event) => handleMouseEnter('TW-38', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img08}
            />
            <image x="3167" y="1036" width="410" height="390" id="B-39"
                onMouseEnter={(event) => handleMouseEnter('B-39', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img09}
            />
            <image x="2855" y="805" width="438" height="394" id="A-40"
                onMouseEnter={(event) => handleMouseEnter('A-40', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img10}
            />
            <image x="2607" y="634" width="356" height="299" id="B-41"
                onMouseEnter={(event) => handleMouseEnter('B-41', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img11}
            />
            <image x="2169" y="788" width="430" height="373" id="B-46"
                onMouseEnter={(event) => handleMouseEnter('B-46', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img12}
            />
            <image x="2474" y="991" width="378" height="401" id="A-45"
                onMouseEnter={(event) => handleMouseEnter('A-45', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img13}
            />
            <image x="2778" y="1231" width="422" height="389" id="B-44"
                onMouseEnter={(event) => handleMouseEnter('B-44', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img14}
            />
            <image x="3100" y="1466" width="285" height="297" id="TW-43"
                onMouseEnter={(event) => handleMouseEnter('TW-43', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img15}
            />
            <image x="3288" y="1603" width="378" height="417" id="B-42"
                onMouseEnter={(event) => handleMouseEnter('B-42', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img16}
            />
            <image x="1758" y="969" width="437" height="375" id="B-47"
                onMouseEnter={(event) => handleMouseEnter('B-47', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img17}
            />
            <image x="2036" y="1195" width="446" height="405" id="A-48"
                onMouseEnter={(event) => handleMouseEnter('A-48', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img18}
            />
            <image x="2341" y="1437" width="415" height="414" id="B-49"
                onMouseEnter={(event) => handleMouseEnter('B-49', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img19}
            />
            <image x="2653" y="1687" width="292" height="318" id="TW-50"
                onMouseEnter={(event) => handleMouseEnter('TW-50', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img20}
            />
            <image x="2787" y="1862" width="488" height="423" id="B-51"
                onMouseEnter={(event) => handleMouseEnter('B-51', event)}
                onMouseLeave={handleMouseLeave}
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
                onMouseEnter={(event) => handleMouseEnter('B-31', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img24}
            />
            <image x="3752" y="534" width="396" height="385" id="B-30"
                onMouseEnter={(event) => handleMouseEnter('B-30', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img25}
            />
            <image x="4062" y="742" width="404" height="391" id="B-29"
                onMouseEnter={(event) => handleMouseEnter('B-29', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img26}
            />
            <image x="4406" y="947" width="455" height="385" id="A-28"
                onMouseEnter={(event) => handleMouseEnter('A-28', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img27}
            />
            <image x="4752" y="1174" width="428" height="414" id="B-27"
                onMouseEnter={(event) => handleMouseEnter('B-27', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img28}
            />
            <image x="5085" y="1414" width="485" height="415" id="A-26"
                onMouseEnter={(event) => handleMouseEnter('A-26', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img29}
            />
            <image x="5431" y="1684" width="455" height="431" id="B-25"
                onMouseEnter={(event) => handleMouseEnter('B-25', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img30}
            />
            <image x="5803" y="1945" width="422" height="415" id="B-24"
                onMouseEnter={(event) => handleMouseEnter('B-24', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img31}
            />
            <image x="4618" y="1577" width="456" height="393" id="B-23"
                onMouseEnter={(event) => handleMouseEnter('B-23', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img32}
            />
            <image x="4981" y="1831" width="302" height="306" id="T-22"
                onMouseEnter={(event) => handleMouseEnter('T-22', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img33}
            />
            <image x="5204" y="1989" width="305" height="320" id="T-21"
                onMouseEnter={(event) => handleMouseEnter('T-21', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img34}
            />
            <image x="5409" y="2140" width="455" height="473" id="A-20"
                onMouseEnter={(event) => handleMouseEnter('A-20', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img35}
            />
            <image x="5774" y="2456" width="557" height="430" id="B-19"
                onMouseEnter={(event) => handleMouseEnter('B-19', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img36}
            />
            <image x="6367" y="2689" width="489" height="490" id="A-18"
                onMouseEnter={(event) => handleMouseEnter('A-18', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img37}
            />
            <image x="4228" y="1782" width="428" height="463" id="B-13"
                onMouseEnter={(event) => handleMouseEnter('B-13', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img38}
            />
            <image x="4571" y="2060" width="303" height="332" id="T-14"
                onMouseEnter={(event) => handleMouseEnter('T-14', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img39}
            />
            <image x="4772" y="2225" width="512" height="444" id="A-15"
                onMouseEnter={(event) => handleMouseEnter('A-15', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img40}
            />
            <image x="5166" y="2506" width="483" height="461" id="B-16"
                onMouseEnter={(event) => handleMouseEnter('B-16', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img41}
            />
            <image x="5548" y="2806" width="545" height="481" id="B-17"
                onMouseEnter={(event) => handleMouseEnter('B-17', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img42}
            />
            <image x="5974" y="3116" width="345" height="352" id="B-12+"
                onMouseEnter={(event) => handleMouseEnter('B-12+', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img43}
            />
            <image x="3766" y="2039" width="509" height="413" id="B-11"
                onMouseEnter={(event) => handleMouseEnter('B-11', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img44}
            />
            <image x="4168" y="2288" width="307" height="329" id="T-10"
                onMouseEnter={(event) => handleMouseEnter('T-10', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img45}
            />
            <image x="4368" y="2449" width="446" height="420" id="A-09"
                onMouseEnter={(event) => handleMouseEnter('A-09', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img46}
            />
            <image x="4749" y="2755" width="502" height="455" id="B-08"
                onMouseEnter={(event) => handleMouseEnter('B-08', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img47}
            />
            <image x="5148" y="3051" width="474" height="498" id="A-07"
                onMouseEnter={(event) => handleMouseEnter('A-07', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img48}
            />
            <image x="5574" y="3377" width="367" height="372" id="B-12"
                onMouseEnter={(event) => handleMouseEnter('B-12', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img49}
            />
            <image x="3348" y="2262" width="405" height="482" id="A-01"
                onMouseEnter={(event) => handleMouseEnter('A-01', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img50}
            />
            <image x="3711" y="2538" width="319" height="346" id="T-02"
                onMouseEnter={(event) => handleMouseEnter('T-02', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img51}
            />
            <image x="3937" y="2714" width="315" height="355" id="T-03"
                onMouseEnter={(event) => handleMouseEnter('T-03', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-TW ' + (selectedType === 'TW' || selectedArea === 2 ? 'active-TW' : '')}
                xlinkHref={img52}
            />
            <image x="4147" y="2892" width="482" height="501" id="A-04"
                onMouseEnter={(event) => handleMouseEnter('A-04', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-A ' + (selectedType === 'A' || selectedArea === 0 ? 'active-A' : '')}
                xlinkHref={img53}
            />
            <image x="4539" y="3211" width="500" height="489" id="B-05"
                onMouseEnter={(event) => handleMouseEnter('B-05', event)}
                onMouseLeave={handleMouseLeave}
                onClick={(event) => handleClick(event)}
                className={'villa-B ' + (selectedType === 'B' || selectedArea === 1 ? 'active-B' : '')}
                xlinkHref={img54}
            />
            <image x="4930" y="3538" width="568" height="521" id="A-06"
                onMouseEnter={(event) => handleMouseEnter('A-06', event)}
                onMouseLeave={handleMouseLeave}
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

            {/* Tooltip */}
            {hovered && mousePosition && (
                <g className="tooltip-container">
                    <rect
                        x={mousePosition.x}
                        y={mousePosition.y}
                        width="700"
                        height="200"
                        rx="8"
                        fill="rgba(0, 0, 0, 0.9)"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeWidth="2"
                        pointerEvents="none"
                    />
                    <text
                        x={mousePosition.x + 350}
                        y={mousePosition.y + 120}
                        textAnchor="middle"
                        fill="white"
                        fontSize="70"
                        fontWeight="normal"
                        pointerEvents="none"
                    >
                        Cluster {hovered}
                    </text>
                </g>
            )}

            {/* 360 Icon */}
            <g
                className="icon-360" id="360-E"
                style={{ cursor: 'pointer' }}
                onClick={handle360IconClick}
            >
                {/* White background circle */}
                <circle
                    cx="6475"
                    cy="3255"
                    r="120"
                    fill="white"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                    opacity="0.95"
                />
                <image
                    x="6400"
                    y="3180"
                    width="150"
                    height="150"
                    href="/icons/360-degrees-icon.png"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}
                />
            </g>

            {/* Second 360 Icon */}
            <g
                className="icon-360" id="360-C"
                style={{ cursor: 'pointer' }}
                onClick={handle360IconClick}
            >
                {/* White background circle */}
                <circle
                    cx="2800"
                    cy="1550"
                    r="120"
                    fill="white"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                    opacity="0.95"
                />
                <image
                    x="2725"
                    y="1475"
                    width="150"
                    height="150"
                    href="/icons/360-degrees-icon.png"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}
                />
            </g>

            {/* Third 360 Icon */}
            <g
                className="icon-360" id="360-F"
                style={{ cursor: 'pointer' }}
                onClick={handle360IconClick}
            >
                {/* White background circle */}
                <circle
                    cx="4500"
                    cy="1550"
                    r="120"
                    fill="white"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                    opacity="0.95"
                />
                <image
                    x="4425"
                    y="1475"
                    width="150"
                    height="150"
                    href="/icons/360-degrees-icon.png"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}
                />
            </g>
            {/* 4th 360 Icon */}
            <g
                className="icon-360" id="360-A"
                style={{ cursor: 'pointer' }}
                onClick={handle360IconClick}
            >
                {/* White background circle */}
                <circle
                    cx="2900"
                    cy="1050"
                    r="120"
                    fill="white"
                    stroke="#e0e0e0"
                    strokeWidth="2"
                    opacity="0.95"
                />
                <image
                    x="2825"
                    y="975"
                    width="150"
                    height="150"
                    href="/icons/360-degrees-icon.png"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}
                />
            </g>
                         {/* 5th 360 Icon */}
             <g
                 className="icon-360" id="360-B"
                 style={{ cursor: 'pointer' }}
                 onClick={handle360IconClick}
             >
                 {/* White background circle */}
                 <circle
                     cx="4200"
                     cy="1050"
                     r="120"
                     fill="white"
                     stroke="#e0e0e0"
                     strokeWidth="2"
                     opacity="0.95"
                 />
                 <image
                     x="4125"
                     y="975"
                     width="150"
                     height="150"
                     href="/icons/360-degrees-icon.png"
                     opacity="0.9"
                     style={{ pointerEvents: 'none' }}
                 />
             </g>
            {/* 6th 360 Icon */}
             <g
                 className="icon-360" id="360-D"
                 style={{ cursor: 'pointer' }}
                 onClick={handle360IconClick}
             >
                 {/* White background circle */}
                 <circle
                     cx="3500"
                     cy="1000"
                     r="120"
                     fill="white"
                     stroke="#e0e0e0"
                     strokeWidth="2"
                     opacity="0.95"
                 />
                 <image
                     x="3425"
                     y="925"
                     width="150"
                     height="150"
                     href="/icons/360-degrees-icon.png"
                     opacity="0.9"
                     style={{ pointerEvents: 'none' }}
                 />
             </g>
        </svg>

    );
};

export default MasterPlanSvg;