import "./Registration-demo.css";
import { useState, useRef, useEffect } from "react";
// import logo from '../../../images/'
import { FaCaretDown, FaLessThanEqual } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineVisibilityOff } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import loginbg from "../../../images/bg-login.jpg";
import StatusPopup from "../../components/popup/Popup";
import { useLanguage } from "../../../context/LanguageContext";
import LanguageSelector from "../../components/language-selector/LanguageSelector";
import translation from "../../../translation/translation";
const DemoRegistr = () => {
  if(!localStorage.getItem("email")) window.location = '/page-register'
  const [registrationCircleIndex, setRegistrationCircleIndex] = useState(0);
  const sectionCarouselEl = useRef();
  const [btnPreviousPageState, setBtnPreviousPageState] = useState(false);
  const [languageBoxState, setLanguageBoxState] = useState(false);
  const [postUserDataObj, setPostUserDataObj] = useState({});
  const language2 = useLanguage().language
  const t = translation.registration[language2]
  //useEffect carouselRegisterCardSections
  useEffect(() => {
    sectionCarouselEl.current.scrollLeft =
      registrationCircleIndex * sectionCarouselEl.current.offsetWidth;
  }, [registrationCircleIndex]);
  const email = localStorage.getItem("email");
  const api = "https://dev.plain2do.com/api";
  const spheresLink = `${api}/company-sphere/`;
  const linkFetch = `${api}/gendt-country/`;
  const postRegistrationData = `${api}/user-registration/`;
  const [usersData, setUsersData] = useState([])
  const [redirectState, setRedirectState] = useState(false)
  useEffect(() => {
    if(redirectState === true){
     setTimeout(() => {
      window.location='/page-register'
     }, 3000)
    }
  }, [redirectState])
  useEffect(() => {
    ;(async () => {
      const usersResponse = await fetch(postRegistrationData);
      const usersFetchData = await usersResponse.json();
      setUsersData(usersFetchData.Response)
    })()
  }, [])
  const resendEmailLink = `${api}/send-email/`;
  const [btnResendDisabledState, setBtnResendDisabledState] = useState(true);
  const registerFetch = async (e) => {
    e.preventDefault();
    if(localStorage.getItem("email") && usersData.filter(a => a.email == localStorage.getItem("email")).length == 0){
      const postObj = {
      email: email,
      first_name: firstname,
      last_name: lastname,
      company: {
        OurCompanyINN: comapnyInn?.data?.inn,
        OurCompanyKPP: comapnyInn?.data?.kpp,
        ShortCode: comapnyInn?.data?.name?.short,
        number_of_employees: companyEmployeeNumber,
        sphere: selectCompanySphere.id,
        address: unrestricted_value
      },
      password: password,
      phone_number: registrPhoneNumber,
      country: countrySelect.id,
      is_active: false,
    };
    postObj.company[
      "OurCompany" +
        language2.toUpperCase()
    ] = comapnyInn?.value;
    setPostUserDataObj(postObj);
    if (btnSubmitAttribute === false && submitBtnState === false) {
      setLoadingVisibility(true);
      const responseRegister = await fetch(postRegistrationData, {
        method: "POST",
        body: JSON.stringify(postObj),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const dataRegister = await responseRegister.json();
      if (dataRegister) {
        setResendEmailBtnState(true);
        setLoadingVisibility(false);
        alert(t.thedatahasbeensenttoyouremailpleasecheckyouremail);
        // window.location.pathname = '/login'
      }
    }
  }
    else{
      setStatusPopup(true)
      setErrorMsg({msg: t.theemailisalreadyinuse, status: 404, title: t.error.charAt(0).toUpperCase() + t.error.slice(1)})
      setRedirectState(true)
    }
  };
  const [emailSendLoading, setEmailSendLoading] = useState(false);
  const resendEmailAction = async () => {
    try {
      setEmailSendLoading(true);
      const responseEmail = await fetch(resendEmailLink, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const dataEmail = await responseEmail.json();
      setEmailSendLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };
  const [circleIndexState, setCircleIndexState] = useState(false);
  const [countrySelectData, setCountrySelectData] = useState([]);
  const [countrySelectData2, setCountrySelectData2] = useState([]);
  const [countrySelect, setCountrySelect] = useState({});
  const [styleValueBox, setStyleValueBox] = useState(0);
  const countryPhoneNumbers = [
    { phoneCode: "+93", country: "Afghanistan", phonenumber: "+93 7 123 4567" },
    { phoneCode: "+355", country: "Albania", phonenumber: "+355 6 123 4567" },
    {
      phoneCode: "+672",
      country: "Antarctica",
      phonenumber: "+672 2 123 4567",
    }, // Special case - no dedicated phone codes
    { phoneCode: "+213", country: "Algeria", phonenumber: "+213 5 123 4567" },
    {
      phoneCode: "+1684",
      country: "American Samoa",
      phonenumber: "+1684 6 123 4567",
    },
    { phoneCode: "+376", country: "Andorra", phonenumber: "+376 3 123 4567" },
    { phoneCode: "+244", country: "Angola", phonenumber: "+244 9 123 4567" },
    {
      phoneCode: "+1268",
      country: "Antigua and Barbuda",
      phonenumber: "+1268 7 123 4567",
    },
    {
      phoneCode: "+994",
      country: "Azerbaijan",
      phonenumber: "+994 5 123 4567",
    },
    { phoneCode: "+54", country: "Argentina", phonenumber: "+54 9 123 4567" },
    { phoneCode: "+61", country: "Australia", phonenumber: "+61 4 1234 5678" },
    { phoneCode: "+43", country: "Austria", phonenumber: "+43 6 123 4567" },
    {
      phoneCode: "+1242",
      country: "Bahamas (the)",
      phonenumber: "+1242 3 123 4567",
    },
    { phoneCode: "+973", country: "Bahrain", phonenumber: "+973 3 123 4567" },
    {
      phoneCode: "+880",
      country: "Bangladesh",
      phonenumber: "+880 1 123 4567",
    },
    { phoneCode: "+374", country: "Armenia", phonenumber: "+374 9 123 4567" },
    {
      phoneCode: "+1246",
      country: "Barbados",
      phonenumber: "+1246 2 123 4567",
    },
    { phoneCode: "+32", country: "Belgium", phonenumber: "+32 4 123 4567" },
    { phoneCode: "+1441", country: "Bermuda", phonenumber: "+1441 5 123 4567" },
    { phoneCode: "+975", country: "Bhutan", phonenumber: "+975 7 123 4567" },
    {
      phoneCode: "+591",
      country: "Bolivia (Plurinational State of)",
      phonenumber: "+591 7 123 4567",
    },
    {
      phoneCode: "+387",
      country: "Bosnia and Herzegovina",
      phonenumber: "+387 6 123 4567",
    },
    { phoneCode: "+267", country: "Botswana", phonenumber: "+267 7 123 4567" },
    {
      phoneCode: "+47",
      country: "Bouvet Island",
      phonenumber: "+47 7 123 4567",
    }, // Special case - part of Norway
    { phoneCode: "+55", country: "Brazil", phonenumber: "+55 1 1234 5678" },
    { phoneCode: "+501", country: "Belize", phonenumber: "+501 2 123 4567" },
    {
      phoneCode: "+246",
      country: "British Indian Ocean Territory (the)",
      phonenumber: "+246 1 123 4567",
    },
    {
      phoneCode: "+677",
      country: "Solomon Islands",
      phonenumber: "+677 7 123 4567",
    },
    {
      phoneCode: "+1284",
      country: "Virgin Islands (British)",
      phonenumber: "+1284 3 123 4567",
    },
    {
      phoneCode: "+673",
      country: "Brunei Darussalam",
      phonenumber: "+673 2 123 4567",
    },
    { phoneCode: "+359", country: "Bulgaria", phonenumber: "+359 8 123 4567" },
    { phoneCode: "+95", country: "Myanmar", phonenumber: "+95 9 123 4567" },
    { phoneCode: "+257", country: "Burundi", phonenumber: "+257 7 123 4567" },
    { phoneCode: "+375", country: "Belarus", phonenumber: "+375 3 123 4567" },
    { phoneCode: "+855", country: "Cambodia", phonenumber: "+855 9 123 4567" },
    { phoneCode: "+237", country: "Cameroon", phonenumber: "+237 6 123 4567" },
    { phoneCode: "+1", country: "Canada", phonenumber: "+1 234 567 8901" },
    {
      phoneCode: "+238",
      country: "Cabo Verde",
      phonenumber: "+238 9 123 4567",
    },
    {
      phoneCode: "+1345",
      country: "Cayman Islands (the)",
      phonenumber: "+1345 9 123 4567",
    },
    {
      phoneCode: "+236",
      country: "Central African Republic (the)",
      phonenumber: "+236 7 123 4567",
    },
    { phoneCode: "+94", country: "Sri Lanka", phonenumber: "+94 7 123 4567" },
    { phoneCode: "+235", country: "Chad", phonenumber: "+235 6 123 4567" },
    { phoneCode: "+56", country: "Chile", phonenumber: "+56 9 123 4567" },
    { phoneCode: "+86", country: "China", phonenumber: "+86 1 1234 5678" },
    {
      phoneCode: "+886",
      country: "Taiwan (Province of China)",
      phonenumber: "+886 9 123 4567",
    },
    {
      phoneCode: "+61",
      country: "Christmas Island",
      phonenumber: "+61 8 123 4567",
    }, // Special case - part of Australia
    {
      phoneCode: "+61",
      country: "Cocos (Keeling) Islands (the)",
      phonenumber: "+61 8 123 4567",
    }, // Special case - part of Australia
    { phoneCode: "+57", country: "Colombia", phonenumber: "+57 3 123 4567" },
    {
      phoneCode: "+269",
      country: "Comoros (the)",
      phonenumber: "+269 7 123 4567",
    },
    { phoneCode: "+262", country: "Mayotte", phonenumber: "+262 6 123 4567" }, // Special case - part of France
    {
      phoneCode: "+242",
      country: "Congo (the)",
      phonenumber: "+242 6 123 4567",
    },
    {
      phoneCode: "+243",
      country: "Congo (the Democratic Republic of the)",
      phonenumber: "+243 9 123 4567",
    },
    {
      phoneCode: "+682",
      country: "Cook Islands (the)",
      phonenumber: "+682 2 123 4567",
    },
    {
      phoneCode: "+506",
      country: "Costa Rica",
      phonenumber: "+506 8 123 4567",
    },
    { phoneCode: "+385", country: "Croatia", phonenumber: "+385 9 123 4567" },
    { phoneCode: "+53", country: "Cuba", phonenumber: "+53 5 123 4567" },
    { phoneCode: "+357", country: "Cyprus", phonenumber: "+357 9 123 4567" },
    { phoneCode: "+420", country: "Czechia", phonenumber: "+420 7 123 4567" },
    { phoneCode: "+229", country: "Benin", phonenumber: "+229 9 123 4567" },
    { phoneCode: "+45", country: "Denmark", phonenumber: "+45 2 123 4567" },
    {
      phoneCode: "+1767",
      country: "Dominica",
      phonenumber: "+1767 2 123 4567",
    },
    {
      phoneCode: "+1809",
      country: "Dominican Republic (the)",
      phonenumber: "+1809 8 123 4567",
    },
    { phoneCode: "+593", country: "Ecuador", phonenumber: "+593 9 123 4567" },
    {
      phoneCode: "+503",
      country: "El Salvador",
      phonenumber: "+503 7 123 4567",
    },
    {
      phoneCode: "+240",
      country: "Equatorial Guinea",
      phonenumber: "+240 6 123 4567",
    },
    { phoneCode: "+251", country: "Ethiopia", phonenumber: "+251 9 123 4567" },
    { phoneCode: "+291", country: "Eritrea", phonenumber: "+291 1 123 4567" },
    { phoneCode: "+372", country: "Estonia", phonenumber: "+372 5 123 4567" },
    {
      phoneCode: "+298",
      country: "Faroe Islands (the)",
      phonenumber: "+298 2 123 4567",
    },
    {
      phoneCode: "+500",
      country: "Falkland Islands (the) [Malvinas]",
      phonenumber: "+500 1 123 4567",
    },
    {
      phoneCode: "+500",
      country: "South Georgia and the South Sandwich Islands",
      phonenumber: "+500 1 123 4567",
    },
    { phoneCode: "+679", country: "Fiji", phonenumber: "+679 7 123 4567" },
    { phoneCode: "+358", country: "Finland", phonenumber: "+358 4 123 4567" },
    {
      phoneCode: "+358",
      country: "Åland Islands",
      phonenumber: "+358 18 123 4567",
    }, // Special case - part of Finland
    { phoneCode: "+33", country: "France", phonenumber: "+33 6 123 4567" },
    {
      phoneCode: "+594",
      country: "French Guiana",
      phonenumber: "+594 6 123 4567",
    },
    {
      phoneCode: "+689",
      country: "French Polynesia",
      phonenumber: "+689 8 123 4567",
    },
    {
      phoneCode: "+262",
      country: "French Southern Territories (the)",
      phonenumber: "+262 6 123 4567",
    }, // Special case - part of France
    { phoneCode: "+253", country: "Djibouti", phonenumber: "+253 7 123 4567" },
    { phoneCode: "+241", country: "Gabon", phonenumber: "+241 6 123 4567" },
    { phoneCode: "+995", country: "Georgia", phonenumber: "+995 5 123 4567" },
    {
      phoneCode: "+220",
      country: "Gambia (the)",
      phonenumber: "+220 7 123 4567",
    },
    {
      phoneCode: "+970",
      country: "Palestine, State of",
      phonenumber: "+970 5 123 4567",
    },
    { phoneCode: "+49", country: "Germany", phonenumber: "+49 1 1234 5678" },
    { phoneCode: "+233", country: "Ghana", phonenumber: "+233 5 123 4567" },
    { phoneCode: "+350", country: "Gibraltar", phonenumber: "+350 5 123 4567" },
    {
      phoneCode: "+1",
      country: "United States Minor Outlying Islands (the)",
      phonenumber: "+1 234 567 8901",
    },
    { phoneCode: "+36", country: "Hungary", phonenumber: "+36 1 234 5678" },
    { phoneCode: "+354", country: "Iceland", phonenumber: "+354 666 1234" },
    { phoneCode: "+91", country: "India", phonenumber: "+91 987 654 3210" },
    { phoneCode: "+62", country: "Indonesia", phonenumber: "+62 812 345 6789" },
    {
      phoneCode: "+98",
      country: "Iran (Islamic Republic of)",
      phonenumber: "+98 912 345 6789",
    },
    { phoneCode: "+964", country: "Iraq", phonenumber: "+964 771 234 5678" },
    { phoneCode: "+353", country: "Ireland", phonenumber: "+353 87 654 3210" },
    { phoneCode: "+972", country: "Israel", phonenumber: "+972 54 123 4567" },
    { phoneCode: "+39", country: "Italy", phonenumber: "+39 347 123 4567" },
    {
      phoneCode: "+225",
      country: "Côte d'Ivoire",
      phonenumber: "+225 77 123 4567",
    },
    { phoneCode: "+1876", country: "Jamaica", phonenumber: "+1876 876 1234" },
    { phoneCode: "+81", country: "Japan", phonenumber: "+81 90 1234 5678" },
    { phoneCode: "+7", country: "Kazakhstan", phonenumber: "+7 727 123 4567" },
    { phoneCode: "+962", country: "Jordan", phonenumber: "+962 79 123 4567" },
    { phoneCode: "+254", country: "Kenya", phonenumber: "+254 722 123 4567" },
    {
      phoneCode: "+850",
      country: "Korea (the Democratic People's Republic of)",
      phonenumber: "+850 2 123 4567",
    },
    {
      phoneCode: "+82",
      country: "Korea (the Republic of)",
      phonenumber: "+82 10 1234 5678",
    },
    { phoneCode: "+965", country: "Kuwait", phonenumber: "+965 999 12345" },
    {
      phoneCode: "+996",
      country: "Kyrgyzstan",
      phonenumber: "+996 777 123 4567",
    },
    {
      phoneCode: "+856",
      country: "Lao People's Democratic Republic (the)",
      phonenumber: "+856 20 555 1234",
    },
    { phoneCode: "+961", country: "Lebanon", phonenumber: "+961 71 123 4567" },
    { phoneCode: "+266", country: "Lesotho", phonenumber: "+266 58 123 4567" },
    { phoneCode: "+371", country: "Latvia", phonenumber: "+371 29 123 4567" },
    { phoneCode: "+231", country: "Liberia", phonenumber: "+231 886 123 4567" },
    { phoneCode: "+218", country: "Libya", phonenumber: "+218 91 123 4567" },
    {
      phoneCode: "+423",
      country: "Liechtenstein",
      phonenumber: "+423 77 123 4567",
    },
    { phoneCode: "+370", country: "Lithuania", phonenumber: "+370 6 123 4567" },
    {
      phoneCode: "+352",
      country: "Luxembourg",
      phonenumber: "+352 621 123 456",
    },
    { phoneCode: "+853", country: "Macao", phonenumber: "+853 66 123 4567" },
    {
      phoneCode: "+261",
      country: "Madagascar",
      phonenumber: "+261 33 123 4567",
    },
    { phoneCode: "+265", country: "Malawi", phonenumber: "+265 99 123 4567" },
    { phoneCode: "+60", country: "Malaysia", phonenumber: "+60 12 345 6789" },
    {
      phoneCode: "+960",
      country: "Maldives",
      phonenumber: "+960 999 123 4567",
    },
    { phoneCode: "+223", country: "Mali", phonenumber: "+223 76 123 4567" },
    { phoneCode: "+356", country: "Malta", phonenumber: "+356 99 123 4567" },
    {
      phoneCode: "+596",
      country: "Martinique",
      phonenumber: "+596 696 123 456",
    },
    {
      phoneCode: "+222",
      country: "Mauritania",
      phonenumber: "+222 45 123 4567",
    },
    {
      phoneCode: "+230",
      country: "Mauritius",
      phonenumber: "+230 57 123 4567",
    },
    { phoneCode: "+52", country: "Mexico", phonenumber: "+52 55 1234 5678" },
    { phoneCode: "+377", country: "Monaco", phonenumber: "+377 97 97 1234" },
    { phoneCode: "+976", country: "Mongolia", phonenumber: "+976 99 123 4567" },
    {
      phoneCode: "+373",
      country: "Moldova (the Republic of)",
      phonenumber: "+373 69 123 4567",
    },
    {
      phoneCode: "+382",
      country: "Montenegro",
      phonenumber: "+382 69 123 4567",
    },
    {
      phoneCode: "+1664",
      country: "Montserrat",
      phonenumber: "+1664 491 1234",
    },
    { phoneCode: "+212", country: "Morocco", phonenumber: "+212 6 123 4567" },
    {
      phoneCode: "+258",
      country: "Mozambique",
      phonenumber: "+258 84 123 4567",
    },
    { phoneCode: "+968", country: "Oman", phonenumber: "+968 99 123 4567" },
    { phoneCode: "+264", country: "Namibia", phonenumber: "+264 81 123 4567" },
    { phoneCode: "+674", country: "Nauru", phonenumber: "+674 555 1234" },
    { phoneCode: "+977", country: "Nepal", phonenumber: "+977 98 123 4567" },
    {
      phoneCode: "+31",
      country: "Netherlands (the)",
      phonenumber: "+31 6 1234 5678",
    },
    { phoneCode: "+599", country: "Curaçao", phonenumber: "+599 9 123 4567" },
    { phoneCode: "+297", country: "Aruba", phonenumber: "+297 58 123 4567" },
    {
      phoneCode: "+1721",
      country: "Sint Maarten (Dutch part)",
      phonenumber: "+1721 555 1234",
    },
    {
      phoneCode: "+599",
      country: "Bonaire, Sint Eustatius and Saba",
      phonenumber: "+599 7 123 4567",
    },
    {
      phoneCode: "+687",
      country: "New Caledonia",
      phonenumber: "+687 7 123 4567",
    },
    { phoneCode: "+678", country: "Vanuatu", phonenumber: "+678 7 123 4567" },
    {
      phoneCode: "+64",
      country: "New Zealand",
      phonenumber: "+64 21 123 4567",
    },
    { phoneCode: "+505", country: "Nicaragua", phonenumber: "+505 8 123 4567" },
    {
      phoneCode: "+227",
      country: "Niger (the)",
      phonenumber: "+227 9 123 4567",
    },
    { phoneCode: "+234", country: "Nigeria", phonenumber: "+234 81 123 4567" },
    { phoneCode: "+683", country: "Niue", phonenumber: "+683 4 123 4567" },
    {
      phoneCode: "+672",
      country: "Norfolk Island",
      phonenumber: "+672 2 123 4567",
    },
    { phoneCode: "+47", country: "Norway", phonenumber: "+47 9 123 4567" },
    {
      phoneCode: "+1670",
      country: "Northern Mariana Islands (the)",
      phonenumber: "+1670 234 5678",
    },
    {
      phoneCode: "+1",
      country: "United States Minor Outlying Islands (the)",
      phonenumber: "+1 234 567 8901",
    },
    {
      phoneCode: "+691",
      country: "Micronesia (Federated States of)",
      phonenumber: "+691 6 123 4567",
    },
    {
      phoneCode: "+692",
      country: "Marshall Islands (the)",
      phonenumber: "+692 6 123 4567",
    },
    { phoneCode: "+680", country: "Palau", phonenumber: "+680 488 1234" },
    { phoneCode: "+92", country: "Pakistan", phonenumber: "+92 3 1234 5678" },
    { phoneCode: "+507", country: "Panama", phonenumber: "+507 6 123 4567" },
    {
      phoneCode: "+675",
      country: "Papua New Guinea",
      phonenumber: "+675 7 123 4567",
    },
    { phoneCode: "+595", country: "Paraguay", phonenumber: "+595 9 123 4567" },
    { phoneCode: "+51", country: "Peru", phonenumber: "+51 9 123 4567" },
    {
      phoneCode: "+63",
      country: "Philippines (the)",
      phonenumber: "+63 9 123 4567",
    },
    { phoneCode: "+870", country: "Pitcairn", phonenumber: "+870 4 123 4567" },
    { phoneCode: "+48", country: "Poland", phonenumber: "+48 6 123 4567" },
    { phoneCode: "+351", country: "Portugal", phonenumber: "+351 9 123 4567" },
    {
      phoneCode: "+245",
      country: "Guinea-Bissau",
      phonenumber: "+245 9 123 4567",
    },
    {
      phoneCode: "+670",
      country: "Timor-Leste",
      phonenumber: "+670 7 123 4567",
    },
    {
      phoneCode: "+1787",
      country: "Puerto Rico",
      phonenumber: "+1787 234 5678",
    },
    { phoneCode: "+974", country: "Qatar", phonenumber: "+974 5 123 4567" },
    { phoneCode: "+262", country: "Réunion", phonenumber: "+262 6 123 4567" },
    { phoneCode: "+40", country: "Romania", phonenumber: "+40 7 123 4567" },
    {
      phoneCode: "+7",
      country: "Russian Federation (the)",
      phonenumber: "+7 495 123 45 67",
    },
    { phoneCode: "+250", country: "Rwanda", phonenumber: "+250 7 123 4567" },
    {
      phoneCode: "+590",
      country: "Saint Barthélemy",
      phonenumber: "+590 6 123 4567",
    },
    {
      phoneCode: "+1758",
      country: "Saint Lucia",
      phonenumber: "+1758 7 123 4567",
    },
    {
      phoneCode: "+1869",
      country: "Saint Kitts and Nevis",
      phonenumber: "+1869 662 1234",
    },
    { phoneCode: "+1264", country: "Anguilla", phonenumber: "+1264 584 1234" },
    {
      phoneCode: "+1758",
      country: "Saint Lucia",
      phonenumber: "+1758 7 123 4567",
    },
    {
      phoneCode: "+590",
      country: "Saint Martin (French part)",
      phonenumber: "+590 6 123 4567",
    },
    {
      phoneCode: "+508",
      country: "Saint Pierre and Miquelon",
      phonenumber: "+508 5 123 4567",
    },
    {
      phoneCode: "+1784",
      country: "Saint Vincent and the Grenadines",
      phonenumber: "+1784 4 123 4567",
    },
    {
      phoneCode: "+378",
      country: "San Marino",
      phonenumber: "+378 05 123 4567",
    },
    {
      phoneCode: "+239",
      country: "Sao Tome and Principe",
      phonenumber: "+239 9 123 4567",
    },
    {
      phoneCode: "+966",
      country: "Saudi Arabia",
      phonenumber: "+966 5 123 4567",
    },
    { phoneCode: "+221", country: "Senegal", phonenumber: "+221 77 123 4567" },
    { phoneCode: "+381", country: "Serbia", phonenumber: "+381 6 123 4567" },
    {
      phoneCode: "+248",
      country: "Seychelles",
      phonenumber: "+248 25 123 4567",
    },
    {
      phoneCode: "+232",
      country: "Sierra Leone",
      phonenumber: "+232 76 123 4567",
    },
    { phoneCode: "+65", country: "Singapore", phonenumber: "+65 9 1234 5678" },
    { phoneCode: "+421", country: "Slovakia", phonenumber: "+421 9 123 4567" },
    { phoneCode: "+386", country: "Slovenia", phonenumber: "+386 40 123 4567" },
    {
      phoneCode: "+677",
      country: "Solomon Islands",
      phonenumber: "+677 7 123 4567",
    },
    { phoneCode: "+252", country: "Somalia", phonenumber: "+252 6 123 4567" },
    {
      phoneCode: "+27",
      country: "South Africa",
      phonenumber: "+27 6 123 4567",
    },
    {
      phoneCode: "+211",
      country: "South Sudan",
      phonenumber: "+211 9 123 4567",
    },
    {
      phoneCode: "+500",
      country: "South Georgia and the South Sandwich Islands",
      phonenumber: "+500 1 123 4567",
    },
    {
      phoneCode: "+852",
      country: "Hong Kong",
      phonenumber: "+852 9 1234 5678",
    },
    { phoneCode: "+34", country: "Spain", phonenumber: "+34 6 123 4567" },
    { phoneCode: "+94", country: "Sri Lanka", phonenumber: "+94 7 123 4567" },
    { phoneCode: "+249", country: "Sudan", phonenumber: "+249 9 123 4567" },
    { phoneCode: "+597", country: "Suriname", phonenumber: "+597 8 123 4567" },
    {
      phoneCode: "+47",
      country: "Svalbard and Jan Mayen",
      phonenumber: "+47 7 123 4567",
    },
    { phoneCode: "+268", country: "Swaziland", phonenumber: "+268 7 123 4567" },
    { phoneCode: "+46", country: "Sweden", phonenumber: "+46 7 123 4567" },
    { phoneCode: "+41", country: "Switzerland", phonenumber: "+41 7 123 4567" },
    {
      phoneCode: "+963",
      country: "Syrian Arab Republic",
      phonenumber: "+963 9 123 4567",
    },
    {
      phoneCode: "+886",
      country: "Taiwan (Province of China)",
      phonenumber: "+886 9 123 4567",
    },
    {
      phoneCode: "+992",
      country: "Tajikistan",
      phonenumber: "+992 9 123 4567",
    },
    {
      phoneCode: "+255",
      country: "Tanzania, United Republic of",
      phonenumber: "+255 7 123 4567",
    },
    { phoneCode: "+66", country: "Thailand", phonenumber: "+66 9 123 4567" },
    {
      phoneCode: "+670",
      country: "Timor-Leste",
      phonenumber: "+670 7 123 4567",
    },
    { phoneCode: "+228", country: "Togo", phonenumber: "+228 9 123 4567" },
    { phoneCode: "+688", country: "Tokelau", phonenumber: "+688 4 123 4567" },
    { phoneCode: "+676", country: "Tonga", phonenumber: "+676 7 123 4567" },
    {
      phoneCode: "+1649",
      country: "Turks and Caicos Islands (the)",
      phonenumber: "+1649 234 5678",
    },
    { phoneCode: "+90", country: "Turkey", phonenumber: "+90 5 123 4567" },
    {
      phoneCode: "+993",
      country: "Turkmenistan",
      phonenumber: "+993 6 123 4567",
    },
    {
      phoneCode: "+1868",
      country: "Trinidad and Tobago",
      phonenumber: "+1868 7 123 4567",
    },
    { phoneCode: "+216", country: "Tunisia", phonenumber: "+216 9 123 4567" },
    { phoneCode: "+256", country: "Uganda", phonenumber: "+256 7 123 4567" },
    { phoneCode: "+380", country: "Ukraine", phonenumber: "+380 9 123 4567" },
    {
      phoneCode: "+971",
      country: "United Arab Emirates (the)",
      phonenumber: "+971 5 123 4567",
    },
    {
      phoneCode: "+44",
      country: "United Kingdom of Great Britain and Northern Ireland (the)",
      phonenumber: "+44 7 123 456 7890",
    },
    {
      phoneCode: "+1",
      country: "United States of America (the)",
      phonenumber: "+1 234 567 8901",
    },
    { phoneCode: "+598", country: "Uruguay", phonenumber: "+598 9 123 4567" },
    {
      phoneCode: "+998",
      country: "Uzbekistan",
      phonenumber: "+998 9 123 4567",
    },
    { phoneCode: "+678", country: "Vanuatu", phonenumber: "+678 7 123 4567" },
    {
      phoneCode: "+58",
      country: "Venezuela (Bolivarian Republic of)",
      phonenumber: "+58 4 123 4567",
    },
    {
      phoneCode: "+84",
      country: "Viet Nam",
      phonenumber: "+84 9 123 456 7890",
    },
    {
      phoneCode: "+1284",
      country: "Virgin Islands (British)",
      phonenumber: "+1284 3 123 4567",
    },
    {
      phoneCode: "+1340",
      country: "Virgin Islands (U.S.)",
      phonenumber: "+1340 3 123 4567",
    },
    { phoneCode: "+81", country: "Wake Island", phonenumber: "+81 9 123 4567" },
    { phoneCode: "+260", country: "Zambia", phonenumber: "+260 9 123 4567" },
    { phoneCode: "+263", country: "Zimbabwe", phonenumber: "+263 7 123 4567" },
    {
      phoneCode: "+1",
      country: "United States of America (the)",
      phonenumber: "+1 234 567 8901",
    },
    {
      phoneCode: "+1",
      country: "United States of America (the)",
      phonenumber: "+1 234 567 8901",
    },
    {
      phoneCode: "+290",
      country: "Saint Helena, Ascension and Tristan da Cunha",
      phonenumber: "+290 1 123 4567",
    },
    {
      phoneCode: "+1869",
      country: "Saint Kitts and Nevis",
      phonenumber: "+1869 662 1234",
    },
    { phoneCode: "+1264", country: "Anguilla", phonenumber: "+1264 584 1234" },
    {
      phoneCode: "+1758",
      country: "Saint Lucia",
      phonenumber: "+1758 7 123 4567",
    },
    {
      phoneCode: "+590",
      country: "Saint Martin (French part)",
      phonenumber: "+590 6 123 4567",
    },
    {
      phoneCode: "+508",
      country: "Saint Pierre and Miquelon",
      phonenumber: "+508 5 123 4567",
    },
    {
      phoneCode: "+1784",
      country: "Saint Vincent and the Grenadines",
      phonenumber: "+1784 4 123 4567",
    },
    {
      phoneCode: "+378",
      country: "San Marino",
      phonenumber: "+378 05 123 4567",
    },
    {
      phoneCode: "+239",
      country: "Sao Tome and Principe",
      phonenumber: "+239 9 123 4567",
    },
    {
      phoneCode: "+966",
      country: "Saudi Arabia",
      phonenumber: "+966 5 123 4567",
    },
    { phoneCode: "+221", country: "Senegal", phonenumber: "+221 77 123 4567" },
    { phoneCode: "+381", country: "Serbia", phonenumber: "+381 6 123 4567" },
    {
      phoneCode: "+248",
      country: "Seychelles",
      phonenumber: "+248 25 123 4567",
    },
    {
      phoneCode: "+232",
      country: "Sierra Leone",
      phonenumber: "+232 76 123 4567",
    },
    { phoneCode: "+65", country: "Singapore", phonenumber: "+65 9 1234 5678" },
    { phoneCode: "+421", country: "Slovakia", phonenumber: "+421 9 123 4567" },
    {
      phoneCode: "+84",
      country: "Viet Nam",
      phonenumber: "+84 9 123 456 7890",
    },
    { phoneCode: "+386", country: "Slovenia", phonenumber: "+386 40 123 4567" },
    { phoneCode: "+252", country: "Somalia", phonenumber: "+252 6 123 4567" },
    {
      phoneCode: "+27",
      country: "South Africa",
      phonenumber: "+27 6 123 4567",
    },
    { phoneCode: "+263", country: "Zimbabwe", phonenumber: "+263 7 123 4567" },
    { phoneCode: "+34", country: "Spain", phonenumber: "+34 6 123 4567" },
    {
      phoneCode: "+211",
      country: "South Sudan",
      phonenumber: "+211 9 123 4567",
    },
    {
      phoneCode: "+249",
      country: "Sudan (the)",
      phonenumber: "+249 9 123 4567",
    },
    {
      phoneCode: "+212",
      country: "Western Sahara",
      phonenumber: "+212 6 123 4567",
    }, // Special case - disputed territory, often uses Morocco's code
    { phoneCode: "+597", country: "Suriname", phonenumber: "+597 8 123 4567" },
    {
      phoneCode: "+47",
      country: "Svalbard and Jan Mayen",
      phonenumber: "+47 7 123 4567",
    }, // Special case - part of Norway
    { phoneCode: "+268", country: "Eswatini", phonenumber: "+268 7 123 4567" },
    { phoneCode: "+46", country: "Sweden", phonenumber: "+46 7 123 4567" },
    { phoneCode: "+41", country: "Switzerland", phonenumber: "+41 7 123 4567" },
    {
      phoneCode: "+963",
      country: "Syrian Arab Republic",
      phonenumber: "+963 9 123 4567",
    },
    {
      phoneCode: "+992",
      country: "Tajikistan",
      phonenumber: "+992 9 123 4567",
    },
    { phoneCode: "+66", country: "Thailand", phonenumber: "+66 9 123 4567" },
    { phoneCode: "+228", country: "Togo", phonenumber: "+228 9 123 4567" },
    { phoneCode: "+688", country: "Tokelau", phonenumber: "+688 4 123 4567" },
    { phoneCode: "+676", country: "Tonga", phonenumber: "+676 7 123 4567" },
    {
      phoneCode: "+1868",
      country: "Trinidad and Tobago",
      phonenumber: "+1868 7 123 4567",
    },
    {
      phoneCode: "+971",
      country: "United Arab Emirates (the)",
      phonenumber: "+971 5 123 4567",
    },
    { phoneCode: "+216", country: "Tunisia", phonenumber: "+216 9 123 4567" },
    { phoneCode: "+90", country: "Turkey", phonenumber: "+90 5 123 4567" },
    {
      phoneCode: "+993",
      country: "Turkmenistan",
      phonenumber: "+993 6 123 4567",
    },
    {
      phoneCode: "+1649",
      country: "Turks and Caicos Islands (the)",
      phonenumber: "+1649 234 5678",
    },
    { phoneCode: "+688", country: "Tuvalu", phonenumber: "+688 2 123 4567" },
    { phoneCode: "+256", country: "Uganda", phonenumber: "+256 7 123 4567" },
    { phoneCode: "+380", country: "Ukraine", phonenumber: "+380 9 123 4567" },
    {
      phoneCode: "+389",
      country: "Republic of North Macedonia",
      phonenumber: "+389 7 123 4567",
    },
    { phoneCode: "+20", country: "Egypt", phonenumber: "+20 1 123 4567" },
    {
      phoneCode: "+44",
      country: "United Kingdom of Great Britain and Northern Ireland (the)",
      phonenumber: "+44 7 123 456 7890",
    },
    { phoneCode: "+44", country: "Guernsey", phonenumber: "+44 1 123 4567" }, // Special case - part of UK
    { phoneCode: "+44", country: "Jersey", phonenumber: "+44 1 123 4567" }, // Special case - part of UK
    { phoneCode: "+44", country: "Isle of Man", phonenumber: "+44 1 123 4567" }, // Special case - part of UK
    {
      phoneCode: "+255",
      country: "Tanzania, United Republic of",
      phonenumber: "+255 7 123 4567",
    },
    {
      phoneCode: "+1",
      country: "United States of America (the)",
      phonenumber: "+1 234 567 8901",
    },
    {
      phoneCode: "+1340",
      country: "Virgin Islands (U.S.)",
      phonenumber: "+1340 3 123 4567",
    },
    {
      phoneCode: "+226",
      country: "Burkina Faso",
      phonenumber: "+226 7 123 4567",
    },
    { phoneCode: "+598", country: "Uruguay", phonenumber: "+598 9 123 4567" },
    {
      phoneCode: "+998",
      country: "Uzbekistan",
      phonenumber: "+998 9 123 4567",
    },
    {
      phoneCode: "+58",
      country: "Venezuela (Bolivarian Republic of)",
      phonenumber: "+58 4 123 4567",
    },
    {
      phoneCode: "+681",
      country: "Wallis and Futuna",
      phonenumber: "+681 7 123 4567",
    },
    { phoneCode: "+685", country: "Samoa", phonenumber: "+685 7 123 4567" },
    { phoneCode: "+967", country: "Yemen", phonenumber: "+967 7 123 4567" },
    { phoneCode: "+260", country: "Zambia", phonenumber: "+260 9 123 4567" },
    {
      phoneCode: "+7 840",
      country: "Abkhazia",
      phonenumber: "+7 840 123 4567",
    }, // Special case - disputed territory, often uses Georgia's code
    {
      phoneCode: "+7 928",
      country: "South Ossetia",
      phonenumber: "+7 928 123 4567",
    }, // Special case - disputed territory, often uses Georgia's code
    { phoneCode: "+380", country: "DPR", phonenumber: "+380 9 123 4567" }, // Special case - disputed territory, often uses Ukraine's code
    { phoneCode: "+380", country: "LPR", phonenumber: "+380 9 123 4567" }, // Special case - disputed territory, often uses Ukraine's code
  ];
  useEffect(() => {
   ;(async () => { const arr = [];
    const response = await fetch(linkFetch);
    const data = await response.json();
    data.Response.forEach((e) => {
      countryPhoneNumbers.forEach((a) => {
        if (e.CountryEN === a.country) {
          e["phoneCode"] = a.phoneCode;
          e["phonenumber"] = a.phonenumber;
        }
      });
    });
    setCountrySelectData2(data.Response);
    setCountrySelectData(data.Response);
    setCountrySelect(
      data.Response.find((e) => e.AlphaCode3.toLocaleLowerCase() === "uzb")
    );
    setStyleValueBox(
      data.Response.find((e) => e.AlphaCode3.toLocaleLowerCase() === "uzb").id
    );
  })()}, []);
  const [selectCountrBox, setSelectCountryBox] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [registrPhoneNumber, setRegistrPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [passwordLowerCaseStates, setPasswordLowerCaseStates] = useState(false);
  const [passwordUpperCase, setPasswordUpperCase] = useState(false);
  const [passwordDigit, setPasswordDigit] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [btnSubmitAttribute, setBtnSubmitAttribute] = useState(true);
  const [searchCountryInput, setSearchCountryinput] = useState("");
  const [phoneSelectCountryState, setPhoneSelectCountryState] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [comapnyInn, setCompanyInn] = useState({});
  const [companySelectBox, setCompanySelectBox] = useState(false);
  const [companySpheres, setCompanySpheres] = useState([]);
  const [selectCompanySphere, setSelectCompanySphere] = useState("");
  const [selectCompanySphereOptionIndex, setSelectCompanySphereOptionIndex] =
    useState(0);
  const [companyEmployeeNumber, setCompanyEmployeeNumber] = useState("");
  const [submitBtnState, setSubmitBtnState] = useState(true);
  const [loadingVisibility, setLoadingVisibility] = useState(false);
  const [resendEmailBtnState, setResendEmailBtnState] = useState(false);
  const [statusPopup, setStatusPopup] = useState(false)
  const [errorMsg, setErrorMsg] = useState({})
  const [unrestricted_value, setUnrestricted_value] = useState("")
  useEffect(() => {
    if (companyName.length == 10 || companyName.length == 12) {
      (async () => {
        const response = await fetch(`${api}/find-company/${companyName}/`);
        const data = await response.json();
        if (data.Response.length > 0){
          setUnrestricted_value(data.Response[0].data.address.unrestricted_value
            )
          setCompanyInn(data.Response[0]);}
        else setCompanyInn({});
      })();
    } else setCompanyInn({});
  }, [companyName]);
  useEffect(() => {
    ;(async () => {const responseSpheres = await fetch(spheresLink);
    const dataSpheresCompany = await responseSpheres.json();
    setCompanySpheres(
      dataSpheresCompany.Response.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
      })
    );
    setSelectCompanySphere(dataSpheresCompany.Response[0]);
    setSelectCompanySphereOptionIndex(selectCompanySphere.id);
  })()}, []);
  useEffect(() => {
    if (password.split("").length > 7) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
    if (password.split("").some((e) => isNaN(e) && e === e.toLowerCase())) {
      setPasswordLowerCaseStates(true);
    } else {
      setPasswordLowerCaseStates(false);
    }
    if (password.split("").some((e) => isNaN(e) && e === e.toUpperCase())) {
      setPasswordUpperCase(true);
    } else {
      setPasswordUpperCase(false);
    }
    if (password.split("").some((e) => !isNaN(e))) {
      setPasswordDigit(true);
    } else {
      setPasswordDigit(false);
    }
    if (
      countrySelect.phonenumber &&
      registrPhoneNumber &&
      registrPhoneNumber.length >=
        countrySelect.phonenumber.split(" ").join("").length &&
      firstname &&
      firstname.length > 0 &&
      lastname &&
      lastname.length > 0 &&
      password &&
      password.split("").some((e) => isNaN(e) && e === e.toUpperCase()) &&
      password.split("").some((e) => isNaN(e) && e === e.toLowerCase()) &&
      password.split("").some((e) => !isNaN(e)) &&
      password.split("").length > 7
    ) {
      setBtnSubmitAttribute(false);
      setCircleIndexState(true);
    }
    if (
      (countrySelect.phonenumber &&
        registrPhoneNumber.length <
          countrySelect.phonenumber.split(" ").join("").length) ||
      firstname.length === 0 ||
      lastname.length === 0 ||
      password.split("").some((e) => isNaN(e) && e === e.toUpperCase()) ===
        false ||
      password.split("").some((e) => isNaN(e) && e === e.toLowerCase()) ===
        false ||
      password.split("").some((e) => !isNaN(e)) === false ||
      password.split("").length < 8
    ) {
      setBtnSubmitAttribute(true);
      setCircleIndexState(false);
    }
    if (
      companyName &&
      companyName.length > 0 &&
      companyEmployeeNumber &&
      companyEmployeeNumber.length > 0 &&
      selectCompanySphere["name"+language2.toUpperCase()].length > 0
    ) {
      setSubmitBtnState(false);
    } else {
      setSubmitBtnState(true);
    }
  }, [password, firstname, lastname, registrPhoneNumber]);
  useEffect(() => {
    setCountrySelectData(
      countrySelectData2.filter((e) => {
        return e[
          "Country" +
            language2.toUpperCase()
        ]
          .toLocaleLowerCase()
          .includes(searchCountryInput.toLowerCase());
      })
    );
  }, [searchCountryInput]);
  useEffect(() => {
    if (
      btnSubmitAttribute === false &&
      companyName &&
      companyName.length > 0 &&
      companyEmployeeNumber &&
      companyEmployeeNumber.length > 0 &&
      selectCompanySphere["name"+language2.toUpperCase()] &&
      selectCompanySphere["name"+language2.toUpperCase()].length > 0
    ) {
      setSubmitBtnState(false);
    } else {
      setSubmitBtnState(true);
    }
  }, [
    companyName,
    companyEmployeeNumber,
    selectCompanySphere,
    password,
    firstname,
    lastname,
    registrPhoneNumber,
  ]);
  useEffect(() => {
    if (Object.keys(postUserDataObj).length > 0) {
      if (
        postUserDataObj?.email !== email ||
        postUserDataObj?.first_name !== firstname ||
        postUserDataObj?.last_name !== lastname ||
        postUserDataObj?.password !== password ||
        postUserDataObj?.phone_number !== registrPhoneNumber ||
        postUserDataObj?.country !== countrySelect.id ||
        postUserDataObj?.company?.number_of_employees !==
          companyEmployeeNumber ||
        postUserDataObj?.company?.sphere !== selectCompanySphere?.id
      ) {
        setResendEmailBtnState(false);
      } else setResendEmailBtnState(true);
    }
  }, [
    companyName,
    companyEmployeeNumber,
    selectCompanySphere,
    password,
    firstname,
    lastname,
    registrPhoneNumber,
  ]);
  return (
    <div
      onClick={(e) => {
        if (
          e.target.className !==
          "registration-demo-phonenumber-country-select-box"
        ) {
          setPhoneSelectCountryState(false);
        }
        if (e.target.dataset.registrationDemoDefaultValueCountry !== "data") {
          setSelectCountryBox(false);
        }
        if (e.target.dataset.selectCompanySphere !== "value") {
          setCompanySelectBox(false);
        }
        if (e.target.dataset.selectLanguage !== "select-language") {
          setLanguageBoxState(false);
        }
        if (e.target.dataset.btnPreviousPage !== "switch") {
          setBtnPreviousPageState(false);
        }
      }}
    >
      {statusPopup && <StatusPopup status={errorMsg?.status} setStatusPopup={setStatusPopup} msg={errorMsg?.msg} title_msg={errorMsg?.title}/>}
      <div
        style={{ backgroundImage: "url(" + loginbg + ")" }}
        className="box-wrapper-registr"
      >
        <LanguageSelector languageBoxState={languageBoxState} setLanguageBoxState={setLanguageBoxState} />
        <Link
          to={btnPreviousPageState ? "/page-register" : "/registration-demo"}
        >
          <div
            data-btn-previous-page="switch"
            style={btnPreviousPageState ? { right: "0" } : { right: "-170px" }}
            onClick={() => {
              setBtnPreviousPageState(!btnPreviousPageState);
            }}
            className="registration-demo_box_back"
          >
            <span
              data-btn-previous-page="switch"
              className="registration_demo_previous_page_icon"
            >
              <SlLogout data-btn-previous-page="switch" />
            </span>
            <div
              data-btn-previous-page="switch"
              className="registration_demo_btn_previous_page_signup"
            >
              {t.previous}
            </div>
          </div>
        </Link>
        <div className="registration-demo-box-shadow"></div>
        <div className="register-demo-card">
          <div className="registration-demo-card-controller">
            <div className="registration-span-circle-controller-box">
              <span
                onClick={(e) => {
                  if (circleIndexState) {
                    setRegistrationCircleIndex(0);
                  } else return;
                }}
                style={
                  registrationCircleIndex == 0
                    ? { backgroundColor: "purple", cursor: "default" }
                    : {
                        backgroundColor: "rgb(223, 223, 223)",
                        cursor: "pointer",
                      }
                }
              ></span>
            </div>
            <div className="registration-span-circle-controller-box">
              <span
                onClick={() => {
                  if (circleIndexState) {
                    setRegistrationCircleIndex(1);
                  }
                }}
                style={
                  registrationCircleIndex == 1
                    ? { backgroundColor: "purple", cursor: "default" }
                    : {
                        backgroundColor: "rgb(223, 223, 223)",
                        cursor: "pointer",
                      }
                }
              ></span>
            </div>
          </div>
          <div
            ref={sectionCarouselEl}
            className="registration-demo-carousel-sections"
          >
            <div className="registration-demo-card-section-one">
              <div className="registration-demo-card-carousel-left-side-box">
                <div className="registration-demo-left-side-svg-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    viewBox="0 0 54.613 42.998"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="0.518"
                        y1="0.554"
                        x2="0.706"
                        y2="0.086"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop
                          offset="0"
                          stopColor="#56006e"
                          stopOpacity="0"
                        ></stop>
                        <stop offset="1" stopColor="#56006e"></stop>
                      </linearGradient>
                    </defs>
                    <g
                      id="Сгруппировать_1"
                      data-name="Сгруппировать 1"
                      transform="translate(-67.158 -336.527)"
                    >
                      <path
                        id="Контур_1"
                        data-name="Контур 1"
                        d="M170.058,379.518H157.224l12.748-25.827s5.317-.97,6.843,3.82l-6.161,11.362a10.73,10.73,0,0,0,10.354-10.764,10.962,10.962,0,0,0-10.95-10.95H155.912v32.358H145.281V336.527h24.777a21.605,21.605,0,0,1,21.581,21.581,21.182,21.182,0,0,1-6.348,15.2A21.556,21.556,0,0,1,170.058,379.518Z"
                        transform="translate(-69.868)"
                        fill="#8e00af"
                      ></path>
                      <path
                        id="Контур_2"
                        data-name="Контур 2"
                        d="M308.947,513.42l6.135-11.313c-1.526-4.79-6.843-3.82-6.843-3.82l-8.356,16.929,6.255.426Z"
                        transform="translate(-208.135 -144.596)"
                        fill="url(#linear-gradient)"
                      ></path>
                      <path
                        id="Контур_3"
                        data-name="Контур 3"
                        d="M106.945,476.191s-1.279-3.645-6.759-1.3c-6.936,2.966-19.649,23.3-19.649,23.3l-13.38-19.816,6.691-5.032,6.672,10.871s8.628-12.541,15.829-14.475c5.739-1.541,8.37.571,9.576,2.781A8.9,8.9,0,0,1,106.945,476.191Z"
                        transform="translate(0 -118.659)"
                        fill="#7bb300"
                      ></path>
                    </g>
                  </svg>
                  {/* <svg className="brand-title" style={{ transform: "scale(1.3)" }} width="150px" height="33px"><g id="Сгруппировать_2" data-name="Сгруппировать 2" transform="translate(-632.267 -504.429)"><path id="Контур_4" data-name="Контур 4" d="M641.033,509.584c4.353-.009,7.269,2.237,7.277,6.559.009,4.353-2.9,6.58-7.251,6.589l-5.044.01.015,7.625-3.723.007-.041-20.773Zm-5.054,9.886,5.133-.01c2.191,0,3.66-1.058,3.656-3.279,0-2.192-1.477-3.209-3.669-3.2l-5.134.01Z" transform="translate(0 -3.52)"></path><path id="Контур_5" data-name="Контур 5" d="M696.981,505.046l.044,22.185-3.482.007-.042-21.014Z" transform="translate(-41.815 -0.421)"></path><path id="Контур_6" data-name="Контур 6" d="M717.809,524.781a9.7,9.7,0,0,1,5.791-1.722c3.692-.007,6.308,1.519,6.317,6.321l.02,10.117-3.212.006,0-.991a8.385,8.385,0,0,1-4.41,1.21c-3.182.007-5.706-1.61-5.714-5.123-.007-3.542,2.541-5.408,6.083-5.415a10.251,10.251,0,0,1,3.814.712c-.006-2.912-1.208-3.569-3.249-3.566a7,7,0,0,0-4.081,1.208Zm8.7,11.391-.008-4.023a11.15,11.15,0,0,0-2.973-.444c-2.041,0-3.691.788-3.687,2.679,0,1.8,1.506,2.489,3.277,2.486A9.509,9.509,0,0,0,726.507,536.172Z" transform="translate(-57.587 -12.722)"></path><path id="Контур_7" data-name="Контур 7" d="M775.586,506.406a1.908,1.908,0,1,1-1.925-1.977A1.86,1.86,0,0,1,775.586,506.406Zm-.141,4.294.032,16.061-3.482.006-.032-16.06Z" transform="translate(-95.265 0)"></path><path id="Контур_8" data-name="Контур 8" d="M800.813,523.294l0,1.711a5.949,5.949,0,0,1,4.769-2.111c3.212-.007,5.407,1.79,5.416,6.264l.02,10.176-3.482.006-.019-9.786c-.005-2.462-1.208-3.389-3.069-3.386a3.428,3.428,0,0,0-3.417,2.378l.022,10.807-3.483.007L797.54,523.3Z" transform="translate(-112.86 -12.609)"></path><path id="Контур_9" data-name="Контур 9" d="M851.47,511.606a8.547,8.547,0,0,1,7.288-3.676c3.723-.008,6.938,1.908,6.947,6.08a5.212,5.212,0,0,1-2.333,4.567c-1.708,1.265-4.408,2.23-6.177,3.465a4.084,4.084,0,0,0-2.063,3.757l10.537-.021.007,3.3-14.47.028,0-1.111c-.007-3.212.619-5.674,2.628-7.42,1.737-1.5,4.827-2.651,6.417-3.555,1.469-.843,2.038-1.656,2.036-2.916,0-2.011-1.477-2.909-3.4-2.905a6.288,6.288,0,0,0-5.068,2.712Z" transform="translate(-149.504 -2.391)"></path><path id="Контур_10" data-name="Контур 10" d="M915.6,509.053c6.184-.012,10.995,3.911,11.007,10.3.013,6.424-4.842,10.456-10.965,10.469l-6.214.012-.041-20.773Zm-2.428,17.326,2.492-.005c3.993-.008,7.2-2.536,7.191-6.979-.009-4.383-3.225-6.9-7.218-6.89l-2.492.005Z" transform="translate(-189.233 -3.158)"></path><path id="Контур_11" data-name="Контур 11" d="M983.3,530.943c.011,5.524-2.835,8.441-6.828,8.449-4.052.008-6.88-2.9-6.891-8.423-.011-5.493,2.835-8.41,6.858-8.418C980.4,522.543,983.291,525.449,983.3,530.943Zm-10.416.051c.007,3.422,1.421,5.221,3.582,5.217,2.1,0,3.569-1.809,3.562-5.231-.006-3.452-1.481-5.221-3.583-5.216C974.316,525.768,972.879,527.541,972.885,530.993Z" transform="translate(-230.343 -12.375)"></path></g></svg> */}
                </div>
              </div>
              <div className="registration-demo-card-carousel-right-side-box">
                <div className="registration-demo-card-carousel-right-text-box">
                  <h3>{t.welcometoplain2do}</h3>
                  <h4>{t.thereareonlyfewstepslefttogetstarted}</h4>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRegistrationCircleIndex(1);
                  }}
                  className="registration-demo-form"
                >
                  <div className="registration-demo-input-first-column">
                    <input
                      className="registration-demo-form-input"
                      value={firstname}
                      onInput={(e) => {
                        setFirstname(e.target.value);
                      }}
                      type="text"
                      placeholder={t.enteryourfirstname}
                    />
                    <input
                      className="registration-demo-form-input"
                      value={lastname}
                      onInput={(e) => {
                        setLastname(e.target.value);
                      }}
                      type="text"
                      placeholder={t.enteryourlastname}
                    />
                  </div>
                  <div className="registration-demo-select-country-box">
                    <div
                      onClick={() => {
                        setSelectCountryBox(!selectCountrBox);
                      }}
                      data-registration-demo-default-value-country="data"
                      className="registration-demo-default-value-country"
                    >
                      <div
                        onClick={() => {
                          setSelectCountryBox(!selectCountrBox);
                        }}
                        data-registration-demo-default-value-country="data"
                        className="registration-demo-country-value-box"
                      >
                        <div
                          data-registration-demo-default-value-country="data"
                          className="registration-demo-selected-country-text-box"
                        >
                          {/* <span data-registration-demo-default-value-country="data">{countrySelect.AlphaCode3}</span> */}
                          <span data-registration-demo-default-value-country="data">
                            {countrySelect[
                              "Country" +
                                language2.toUpperCase()
                            ] || `${t.loading}...`}
                          </span>
                        </div>
                      </div>
                      <i
                        data-registration-demo-default-value-country="data"
                        style={
                          selectCountrBox
                            ? { transform: "rotate(180deg)" }
                            : null
                        }
                      >
                        <FaCaretDown />
                      </i>
                    </div>
                    <div
                      onMouseLeave={() => {
                        setStyleValueBox(
                          countrySelectData2.find(
                            (b) => b?.id == countrySelect.id
                          )?.id
                        );
                      }}
                      style={
                        selectCountrBox === true
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                      className="registration-demo-countries-box"
                    >
                      <div className="registration-demo-wrapper-select-country-box">
                        <div
                          data-registration-demo-default-value-country="data"
                          className="registration-demo-search-country-input-box"
                        >
                          <input
                            data-registration-demo-default-value-country="data"
                            onInput={(e) => {
                              setSearchCountryinput(e.target.value);
                            }}
                            value={searchCountryInput}
                            className="registration-demo-search"
                            type="text"
                          />{" "}
                          <i data-registration-demo-default-value-country="data">
                            <IoMdSearch />
                          </i>
                        </div>
                        <div className="registration-demo-countries-flags-box">
                          {countrySelectData.map((e, index) => {
                            return (
                              <div
                                key={e.id}
                                style={
                                  e.id === styleValueBox
                                    ? { background: "purple", color: "white" }
                                    : null
                                }
                                onMouseOver={() => {
                                  setStyleValueBox(e.id);
                                }}
                                className="registration-demo-select-country-value-box"
                                onClick={() => {
                                  setStyleValueBox(e.id);
                                  // countrySelectData.unshift(countrySelect)
                                  setCountrySelect(
                                    countrySelectData.filter(
                                      (a) => a.CountryEN === e.CountryEN
                                    )[0]
                                  );
                                  // setCountrySelectData(countrySelectData.filter(a => a.CountryEN !== e.CountryEN))
                                  setRegistrPhoneNumber("");
                                }}
                              >
                                <span>{e.AlphaCode3}</span>{" "}
                                <span>
                                  {
                                    e[
                                      "Country" +
                                        language2.toUpperCase()
                                    ]
                                  }
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="registration-demo-phone-number-input">
                    <div
                      onMouseLeave={() => {
                        setStyleValueBox(
                          countrySelectData2.findIndex(
                            (b) => b.id == countrySelect.id
                          )
                        );
                      }}
                      style={
                        phoneSelectCountryState
                          ? { visibility: "visible" }
                          : { visibility: "hidden" }
                      }
                      className="registratin-demo-select-country-phonenumber"
                    >
                      {countrySelectData2.map((e, index) => {
                        return (
                          <div
                            key={e.id}
                            style={
                              e.id == styleValueBox
                                ? { background: "purple", color: "white" }
                                : null
                            }
                            onMouseOver={() => {
                              setStyleValueBox(e.id);
                            }}
                            className="registration-demo-select-country-value-box"
                            onClick={() => {
                              setStyleValueBox(index);
                              // countrySelectData.unshift(countrySelect)
                              setCountrySelect(
                                countrySelectData.filter(
                                  (a) => a.CountryEN === e.CountryEN
                                )[0]
                              );
                              // setCountrySelectData(countrySelectData.filter(a => a.CountryEN !== e.CountryEN))
                              setRegistrPhoneNumber("");
                            }}
                          >
                            <span>{e.AlphaCode3}</span>{" "}
                            <span>
                              {
                                e[
                                  "Country" +
                                    language2.toUpperCase()
                                ]
                              }
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <span
                      className="registration-demo-phonenumber-country-select-box"
                      data-registration-demo-default-value-country="data"
                      onClick={() => {
                        setPhoneSelectCountryState(!phoneSelectCountryState);
                      }}
                    >
                      {countrySelect.AlphaCode3}{" "}
                      <i data-registration-demo-default-value-country="data">
                        <IoMdArrowDropdown />
                      </i>
                    </span>
                    <input style={statusPopup ? {borderColor: "red", boxShadow: "0 0 5px red"} : null}
                      type="text"
                      className="registration-demo-form-input"
                      disabled={countrySelectData2.length > 0 ? false : true}
                      placeholder={countrySelect.phonenumber}
                      value={registrPhoneNumber}
                      onClick={() => {
                        if (
                          !registrPhoneNumber.includes(countrySelect.phoneCode)
                        )
                          setRegistrPhoneNumber(
                            countrySelect.phoneCode + registrPhoneNumber
                          );
                      }}
                      onInput={(e) => {
                        let inputValue = e.target.value
                          .split("")
                          .filter((a) => !isNaN(a) || a == "+")
                          .join("")
                          .trim("");
                        if(usersData.filter(a => a.phone_number == inputValue).length > 0){
                          inputValue = countrySelect.phoneCode
                          setErrorMsg({msg: t.theuserexists, status: 404, title: t.error.charAt(0).toUpperCase() + t.error.slice(1)})
                          setStatusPopup(true)
                        }
                        if (
                          inputValue &&
                          !inputValue.includes(countrySelect.phoneCode)
                        ) {
                          setRegistrPhoneNumber(countrySelect.phoneCode);
                        } else {
                          if (
                            inputValue &&
                            inputValue.length > 0 &&
                            inputValue.split("").filter((a) => a === "+")
                              .length > 1
                          ) {
                            setRegistrPhoneNumber(
                              inputValue
                                .split("")
                                .filter(
                                  (a, i) =>
                                    i !== inputValue.split("").lastIndexOf("+")
                                )
                                .join("")
                            );
                          } else
                            setRegistrPhoneNumber(
                                inputValue.slice(0, countrySelect.phonenumber.split(" ").join("").length+1)
                            );
                        }
                      }}
                    />
                  </div>
                  <div className="registration-demo-password-input">
                    <div className="registration-demo-password-input-box">
                      <input
                        className="registration-demo-form-input"
                        value={password}
                        onInput={(e) => {
                          setPassword(e.target.value.trim(""));
                        }}
                        type={passwordVisibility}
                        placeholder={
                          t.enteryourpassword
                        }
                      />
                      <span className="registration-demo-password-visibility">
                        {passwordVisibility === "text" ? (
                          <i
                            onClick={() => {
                              setPasswordVisibility("password");
                            }}
                          >
                            <MdOutlineVisibilityOff />
                          </i>
                        ) : (
                          <i
                            onClick={() => {
                              setPasswordVisibility("text");
                            }}
                          >
                            <MdOutlineVisibility />
                          </i>
                        )}
                      </span>
                    </div>
                    <div className="registration-demo-password-input-value-controller">
                      <div className="registration-demo-input-password-requirements-top-box">
                        <div className="registration-demo-password-requirement-checkbox">
                          <span
                            style={
                              passwordLowerCaseStates
                                ? { backgroundColor: "purple" }
                                : { backgroundColor: "#e7e7e7" }
                            }
                            className="registration-demo-password-checkbox"
                          ></span>{" "}
                          <span className="registration-demo-password-requirement-text">
                            {
                             t.onelowercaseletter
                            }
                          </span>
                        </div>
                        <div className="registration-demo-password-requirement-checkbox">
                          <span
                            style={
                              passwordUpperCase
                                ? { backgroundColor: "purple" }
                                : { backgroundColor: "#e7e7e7" }
                            }
                            className="registration-demo-password-checkbox"
                          ></span>{" "}
                          <span className="registration-demo-password-requirement-text">
                            {
                              t.oneuppercaseletter
                            }
                          </span>
                        </div>
                        <div className="registration-demo-password-requirement-checkbox">
                          <span
                            style={
                              passwordDigit
                                ? { backgroundColor: "purple" }
                                : { backgroundColor: "#e7e7e7" }
                            }
                            className="registration-demo-password-checkbox"
                          ></span>{" "}
                          <span className="registration-demo-password-requirement-text">
                            {
                              t.onedigit
                            }
                          </span>
                        </div>
                        <div className="registration-demo-password-requirement-checkbox">
                          <span
                            style={
                              passwordLength
                                ? {
                                    backgroundColor: "purple",
                                    transition: "0.5s",
                                  }
                                : { backgroundColor: "#e7e7e7" }
                            }
                            className="registration-demo-password-checkbox"
                          ></span>{" "}
                          <span className="registration-demo-password-requirement-text">
                            {
                              t.atleast8symbols
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    style={
                      btnSubmitAttribute === false
                        ? { backgroundColor: "purple" }
                        : { backgroundColor: "rgb(170, 94, 170)" }
                    }
                    className="registration-demo-btn-submit"
                    disabled={btnSubmitAttribute}
                  >
                    {t.next}
                  </button>
                </form>
              </div>
            </div>
            <div className="registration-demo-card-section-two">
              <div className="registration-demo-card-carousel-left-side-box">
                <div className="registration-demo-left-side-svg-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="130"
                    viewBox="0 0 54.613 42.998"
                  >
                    <defs>
                      <linearGradient
                        id="linear-gradient"
                        x1="0.518"
                        y1="0.554"
                        x2="0.706"
                        y2="0.086"
                        gradientUnits="objectBoundingBox"
                      >
                        <stop
                          offset="0"
                          stopColor="#56006e"
                          stopOpacity="0"
                        ></stop>
                        <stop offset="1" stopColor="#56006e"></stop>
                      </linearGradient>
                    </defs>
                    <g
                      id="Сгруппировать_1"
                      data-name="Сгруппировать 1"
                      transform="translate(-67.158 -336.527)"
                    >
                      <path
                        id="Контур_1"
                        data-name="Контур 1"
                        d="M170.058,379.518H157.224l12.748-25.827s5.317-.97,6.843,3.82l-6.161,11.362a10.73,10.73,0,0,0,10.354-10.764,10.962,10.962,0,0,0-10.95-10.95H155.912v32.358H145.281V336.527h24.777a21.605,21.605,0,0,1,21.581,21.581,21.182,21.182,0,0,1-6.348,15.2A21.556,21.556,0,0,1,170.058,379.518Z"
                        transform="translate(-69.868)"
                        fill="#8e00af"
                      ></path>
                      <path
                        id="Контур_2"
                        data-name="Контур 2"
                        d="M308.947,513.42l6.135-11.313c-1.526-4.79-6.843-3.82-6.843-3.82l-8.356,16.929,6.255.426Z"
                        transform="translate(-208.135 -144.596)"
                        fill="url(#linear-gradient)"
                      ></path>
                      <path
                        id="Контур_3"
                        data-name="Контур 3"
                        d="M106.945,476.191s-1.279-3.645-6.759-1.3c-6.936,2.966-19.649,23.3-19.649,23.3l-13.38-19.816,6.691-5.032,6.672,10.871s8.628-12.541,15.829-14.475c5.739-1.541,8.37.571,9.576,2.781A8.9,8.9,0,0,1,106.945,476.191Z"
                        transform="translate(0 -118.659)"
                        fill="#7bb300"
                      ></path>
                    </g>
                  </svg>
                  {/* <svg style={{ transform: "scale(1.3)" }} className="brand-title" width="150px" height="33px"><g id="Сгруппировать_2" data-name="Сгруппировать 2" transform="translate(-632.267 -504.429)"><path id="Контур_4" data-name="Контур 4" d="M641.033,509.584c4.353-.009,7.269,2.237,7.277,6.559.009,4.353-2.9,6.58-7.251,6.589l-5.044.01.015,7.625-3.723.007-.041-20.773Zm-5.054,9.886,5.133-.01c2.191,0,3.66-1.058,3.656-3.279,0-2.192-1.477-3.209-3.669-3.2l-5.134.01Z" transform="translate(0 -3.52)"></path><path id="Контур_5" data-name="Контур 5" d="M696.981,505.046l.044,22.185-3.482.007-.042-21.014Z" transform="translate(-41.815 -0.421)"></path><path id="Контур_6" data-name="Контур 6" d="M717.809,524.781a9.7,9.7,0,0,1,5.791-1.722c3.692-.007,6.308,1.519,6.317,6.321l.02,10.117-3.212.006,0-.991a8.385,8.385,0,0,1-4.41,1.21c-3.182.007-5.706-1.61-5.714-5.123-.007-3.542,2.541-5.408,6.083-5.415a10.251,10.251,0,0,1,3.814.712c-.006-2.912-1.208-3.569-3.249-3.566a7,7,0,0,0-4.081,1.208Zm8.7,11.391-.008-4.023a11.15,11.15,0,0,0-2.973-.444c-2.041,0-3.691.788-3.687,2.679,0,1.8,1.506,2.489,3.277,2.486A9.509,9.509,0,0,0,726.507,536.172Z" transform="translate(-57.587 -12.722)"></path><path id="Контур_7" data-name="Контур 7" d="M775.586,506.406a1.908,1.908,0,1,1-1.925-1.977A1.86,1.86,0,0,1,775.586,506.406Zm-.141,4.294.032,16.061-3.482.006-.032-16.06Z" transform="translate(-95.265 0)"></path><path id="Контур_8" data-name="Контур 8" d="M800.813,523.294l0,1.711a5.949,5.949,0,0,1,4.769-2.111c3.212-.007,5.407,1.79,5.416,6.264l.02,10.176-3.482.006-.019-9.786c-.005-2.462-1.208-3.389-3.069-3.386a3.428,3.428,0,0,0-3.417,2.378l.022,10.807-3.483.007L797.54,523.3Z" transform="translate(-112.86 -12.609)"></path><path id="Контур_9" data-name="Контур 9" d="M851.47,511.606a8.547,8.547,0,0,1,7.288-3.676c3.723-.008,6.938,1.908,6.947,6.08a5.212,5.212,0,0,1-2.333,4.567c-1.708,1.265-4.408,2.23-6.177,3.465a4.084,4.084,0,0,0-2.063,3.757l10.537-.021.007,3.3-14.47.028,0-1.111c-.007-3.212.619-5.674,2.628-7.42,1.737-1.5,4.827-2.651,6.417-3.555,1.469-.843,2.038-1.656,2.036-2.916,0-2.011-1.477-2.909-3.4-2.905a6.288,6.288,0,0,0-5.068,2.712Z" transform="translate(-149.504 -2.391)"></path><path id="Контур_10" data-name="Контур 10" d="M915.6,509.053c6.184-.012,10.995,3.911,11.007,10.3.013,6.424-4.842,10.456-10.965,10.469l-6.214.012-.041-20.773Zm-2.428,17.326,2.492-.005c3.993-.008,7.2-2.536,7.191-6.979-.009-4.383-3.225-6.9-7.218-6.89l-2.492.005Z" transform="translate(-189.233 -3.158)"></path><path id="Контур_11" data-name="Контур 11" d="M983.3,530.943c.011,5.524-2.835,8.441-6.828,8.449-4.052.008-6.88-2.9-6.891-8.423-.011-5.493,2.835-8.41,6.858-8.418C980.4,522.543,983.291,525.449,983.3,530.943Zm-10.416.051c.007,3.422,1.421,5.221,3.582,5.217,2.1,0,3.569-1.809,3.562-5.231-.006-3.452-1.481-5.221-3.583-5.216C974.316,525.768,972.879,527.541,972.885,530.993Z" transform="translate(-230.343 -12.375)"></path></g></svg> */}
                </div>
              </div>
              <div className="registration-demo-second-section-right-side-wrapper-box">
                <form
                  onSubmit={registerFetch}
                  className="registration-demo-carousel-second-section-form"
                >
                  <div className="registration-demo-back-box">
                    <div
                      onClick={() => {
                        setRegistrationCircleIndex(0);
                      }}
                    >
                      <i>
                        <BiArrowBack />
                      </i>
                      <p>{t.back}</p>
                    </div>
                  </div>
                  <div className="registration-demo-company-name-input-box">
                    <input
                      value={companyName}
                      onInput={(e) => {
                        if(e.target.value.length >=9 && usersData.filter(v => v.company?.OurCompanyINN == e.target.value).length>0){
                          setStatusPopup(true)
                          setErrorMsg({msg: t.theuserexists, status: 404, title: t.error.charAt(0).toUpperCase() + t.error.slice(1)})
                          setCompanyName("")
                        }
                        else {
                          setCompanyName(
                          e.target.value.length <= 12
                            ? e.target.value
                                .split("")
                                .filter((a) => !isNaN(a))
                                .join("")
                            : companyName
                        );}
                      }}
                      disabled={btnSubmitAttribute}
                      type="text"
                      placeholder={t.companyINN}
                    />
                  </div>
                  <div
                    style={
                      Object.keys(comapnyInn).length > 0
                        ? { display: "flex" }
                        : { display: "none" }
                    }
                    className="registration-demo-company-inn-kpp-box"
                  >
                    <div className="registration-demo-inn-label-input">
                      <label htmlFor="inn">
                        {t.companyINN}
                      </label>
                      <input
                        type="text"
                        id="inn"
                        disabled
                        value={comapnyInn?.value || ""}
                      />
                    </div>
                    <div className="registration-demo-inn-label-input">
                      <label htmlFor="kpp">
                        {t.companyKPP}
                      </label>
                      <input
                        id="kpp"
                        type="text"
                        disabled
                        value={comapnyInn?.data?.kpp || ""}
                      />
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      setCompanySelectBox(!companySelectBox);
                    }}
                    data-select-company-sphere="value"
                    style={
                      companySelectBox
                        ? { overflow: "visible" }
                        : { overflow: "hidden" }
                    }
                    className="registration-demo-company-sphere-select-box"
                  >
                    <div
                      data-select-company-sphere="value"
                      className="registration-demo-select-company-value-box"
                    >
                      <div
                        data-select-company-sphere="value"
                        className="registration-demo-selected-sphere-text__wrapper"
                      >
                        <span data-select-company-sphere="value">
                          {selectCompanySphere["name"+ language2.toUpperCase()] || `${t.loading}...`}
                        </span>{" "}
                        <i
                          style={
                            companySelectBox
                              ? { transform: "rotate(180deg)" }
                              : null
                          }
                          data-select-company-sphere="value"
                        >
                          <FaAngleDown />{" "}
                        </i>
                      </div>{" "}
                    </div>
                    <div
                      onMouseLeave={() => {
                        setSelectCompanySphereOptionIndex(
                          selectCompanySphere.id
                        );
                      }}
                      className="registration-demo-select-sphere-box"
                    >
                      {companySpheres.map((e, index) => {
                        return (
                          <div
                            style={
                              selectCompanySphereOptionIndex == e.id
                                ? { backgroundColor: "purple", color: "white" }
                                : null
                            }
                            onMouseOver={() => {
                              setSelectCompanySphereOptionIndex(e.id);
                            }}
                            onClick={() => {
                              setSelectCompanySphere(e);
                            }}
                            key={e.id}
                            className="registration-demo-company-sphere-option"
                          >
                            {e["name" + language2.toUpperCase()]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="registration-demo-employee-input-number-box">
                    <input
                      list="employees-number"
                      disabled={btnSubmitAttribute}
                      value={companyEmployeeNumber}
                      onInput={(e) => {
                        setCompanyEmployeeNumber(
                          e.target.value
                            .split("")
                            .filter((a) => !isNaN(a))
                            .join("")
                            .trim("")
                        );
                      }}
                      type="text"
                      placeholder={t.yourcompanysize}
                    />
                    <datalist
                      className="registration-demo-employees-data-list"
                      id="employees-number"
                    >
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                      <option value="500+">500+</option>
                    </datalist>
                  </div>
                  <button
                    type="submit"
                    style={
                      submitBtnState === false && btnSubmitAttribute === false
                        ? { backgroundColor: "purple" }
                        : { backgroundColor: "rgb(170, 94, 170)" }
                    }
                    disabled={submitBtnState}
                    className="btn-submit-register"
                  >
                    <div
                      style={
                        loadingVisibility
                          ? { display: "inline-block" }
                          : { display: "none" }
                      }
                      className="lds-spinner"
                    >
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>{" "}
                    {t.submit}
                  </button>
                </form>
                <div
                  style={
                    resendEmailBtnState
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                  className="registration-demo-resend-email-box"
                >
                  <p>{t.didnotreceiveviaemail}</p>
                  <button
                    onClick={resendEmailAction}
                    className="registration-demo-btn-resend-email"
                  >
                    <div
                      style={
                        emailSendLoading
                          ? { display: "block" }
                          : { display: "none" }
                      }
                      class="lds-ellipsis"
                    >
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    {t.resendemail}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DemoRegistr };
