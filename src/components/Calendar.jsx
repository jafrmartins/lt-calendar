import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CalendarEvent } from './CalendarEvent';
import moment from 'moment'

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  List,
  ListItem,
  Card,
  Typography,
} from "@material-tailwind/react";

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

import ltLogo from '../assets/lt-logo.png';
import { Button, IconButton } from './Button';

import { FaBars } from 'react-icons/fa';
import { useCalendar } from './CalendarProvider';
import { AddConsultaDialog } from './AddConsultaDialog';
import { AddSlotDialog } from './AddSlotDialog';
import { formatDatetime } from '../libraries/Date';
import { FaXmark } from 'react-icons/fa6';
import { useMediaQuery } from '../libraries/MediaQueries';


export const Calendar = ({ ...props }) => {

  const today = new Date();
  const dayRefs = useRef([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const monthOptions = monthNames.map((month, index) => ({ name: month, value: `${index}` }));

  const { listEvents, events, createEvent, updateEvent, deleteEvent, http } = useCalendar()

  console.log(http)

  const [openConsulta, setOpenConsulta] = useState(false);
  const [openSlots, setOpenSlots] = useState(false);


  const scrollToDay = (monthIndex, dayIndex, behavior = 'instant') => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) => ref && ref.getAttribute('data-month') === `${monthIndex}` && ref.getAttribute('data-day') === `${dayIndex}`,
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector('.calendar-container');
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia('(min-width: 1536px)').matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset = elementRect.top - containerRect.top - (containerRect.height / offsetFactor) + (elementRect.height / 2);

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: behavior,
        });
      } else {
        const offset = window.scrollY + elementRect.top - (window.innerHeight / offsetFactor) + (elementRect.height / 2);
  
        window.scrollTo({
          top: offset,
          behavior: behavior,
        });
      }
    }
  };

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  useEffect(() => {
    handleTodayClick()
    listEvents()
  }, [])

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const [date, setDate] = useState([new Date().getDate(), new Date().getMonth(), new Date().getFullYear()] )

  const handleDayClick = (day, month, year) => {
    if (month < 0) {
      setDate([day, 11, year - 1]);
    } else {
      setDate([day, month, year]);
    }
    setOpenConsulta(!openConsulta)
  }

  function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function dragoverHandler(ev) {
    ev.preventDefault();
  }
  
  function dropHandler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  const [renderCalendar, setRenderCalendar] = useState(<></>)

  useEffect(() => {

    setRenderCalendar(generateCalendar(events))
    handleTodayClick()

  }, [events])

  const updateEventCallback = (e) => {
    
    setConsultaDialogValues({ nic: "###########", startDateTime: formatDatetime(e.datetime.toDate()), endDateTime: formatDatetime(e.datetime.toDate())})
    setOpenConsulta(true)

  }

  const deleteEventCallback  = (e) => {
    if(confirm("Tem a certeza que pretende eliminar esta consulta?")) {
      deleteEvent(e.id)
    }
  }

  const generateCalendar = useCallback((events) => {
    const today = new Date();

    const daysInYear = () => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day });
        }
      }

      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day });
        }
      }
    
      return daysInYear;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    const calendar = calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day }, dayIndex) => {

          const todayEvents = events.filter((event) => {

            let m = moment(event.datetime.format('DD/MM/YYYY'), 'DD/MM/YYYY').toDate()

            
            return m.getDate() == day && m.getMonth() == month && year == m.getFullYear()

          })

          const index = weekIndex * 7 + dayIndex;
          const isNewMonth = index === 0 || calendarDays[index - 1].month !== month;
          const isToday = today.getMonth() === month && today.getDate() === day && today.getFullYear() === year;

          return (
            <div
              id={"droppable-" + `${month}-${day}`} onDrop={(e) => [ dropHandler(e)]} onDragOver={(e) => {dragoverHandler(e)}}
              key={`${month}-${day}`}
              ref={(el) => { dayRefs.current[index] = el; }}
              data-month={month}
              data-day={day}
              className={`calendar-day relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40`}

            >
              <span style={{ zIndex: 99999999}} className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${isToday ? 'bg-gradient-to-r from-green-100 to-green-50 ' : ''} ${month < 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                {day}
              </span>
              {isNewMonth && (
                <span style={{ zIndex: 99999999}} className="absolute bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-300 sm:bottom-0 sm:text-lg lg:bottom-2.5 lg:left-3.5 lg:-mb-1 lg:w-fit lg:px-0 lg:text-xl 2xl:mb-[-4px] 2xl:text-2xl">
                  {monthNames[month]}
                </span>
              )}
              { todayEvents ? <div className={isSmallScreen ? 'no-scrollbar' : ''} style={{ display: 'flex', overflowY: 'auto', flexDirection: 'column', margin: isSmallScreen ? '0px 0px 0px 0px' : 'auto', padding: isSmallScreen ? '0px 0px 0px 0px !important' : '10px 10px 10px 10px', maxHeight: '80px', marginTop: '40px', width: '100%',}}>

              { todayEvents.map((ev, i) => {


                return <CalendarEvent mobile={isSmallScreen} style={{width: '100%',}} draggable={true} onDragStart={(e) => { dragstartHandler(e) }} onClickDelete={() => { deleteEventCallback(ev)}} onClickEdit={() => updateEventCallback(ev)} key={i} index={i} datetime={ev.datetime.format("DD/MM/YYYY HH:ss")}>{ isSmallScreen ? <span style={{fontSize: '0.5rem'}}>{ev.datetime.format("HH:ss")}</span>: <>#{i+1} - {ev.datetime.format("DD/MM/YYYY HH:ss")}</>}</CalendarEvent>
                

              })}

              </div> : <></>}
              <button onClick={() => handleDayClick(day, month, year)} type="button" className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100">
                <svg className="size-8 scale-90 text-blue-500 transition-all hover:scale-100 group-focus:scale-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    ));

    return calendar;
  }, [year]);

  useEffect(() => {
    const calendarContainer = document.querySelector('.calendar-container');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(entry.target.getAttribute('data-month'), 10);
            setSelectedMonth(month);
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: '-75% 0px -25% 0px',
        threshold: 0,
      },
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute('data-day') === '15') {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  const [consultaDialogValues, setConsultaDialogValues] = useState({})
  const [slotsDialogValues, setSlotsDialogValues] = useState({})

  const [q, setQ] = useState('')

  const [areSearchResultsOpen, setSearchResultsOpen] = useState(false)

  const [searchResults, setSearchResults] = useState([])

  const handleSearchInputChange = (e) => {

    console.log(e)
    setQ(e.target.value)
    let _q = e.target.value
    setQ(_q)

    events.filter((ev) => {
      return ev.datetime.format("YYYY/MM/DD") != null
    })

    if(_q.length >= 3) {
      setSearchResults(events)
      setSearchResultsOpen(true)
    } else {
      setSearchResults([])
      setSearchResultsOpen(false)
    }

    

  }

  useEffect(() => {

    

  }, [areSearchResultsOpen, searchResults])

  const [isSmallScreen, setIsSmallScreen] = useState(useMediaQuery("sm"))

  useEffect(() => {

    console.log(isSmallScreen)

  }, [isSmallScreen])

  

  
  return (
    <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800" style={{ maxHeight: 'calc(100vh - 40px)'}}>
      <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white">
        <div className="mb-4 flex w-full flex-wrap items-center md:justify-between lg:gap-6">
          <div className="calendar-menu flex items-start">
            <Menu open={openMenu} handler={setOpenMenu} style={{ position: 'absolute !important', display: 'flex', flexGrow: 1, width: '100%', minWidth: '100%', zIndex: '99999 !important', height: 'calc(100vh - 60px)'}}>
              <MenuHandler>
                {<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {/*<IconButton className="flex flex-row items-center justify-center">
                    {<img src={ltLogo} style={{ height: '40px'}} />}
                  </IconButton>*/}
                  <IconButton style={{ height: '40px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <FaBars style={{ height: '20px', width: '20px'}} />
                  </IconButton>
                  
                </div>}
              </MenuHandler>
              <MenuList>
                <div style={{ position: 'absolute !important', zIndex: '99999 !important', height: 'calc(100vh - 100px)', justifyContent: 'start', alignItems: 'start', display: 'flex'}}>
                  <Button onClick={() => setOpenSlots(!openSlots)} >
                    + Adicionar Slots
                  </Button>
                </div>
              </MenuList>
            </Menu>
            <Input value={q} onChange={handleSearchInputChange} label="Pesquisa" style={{ marginLeft: '5px !important', display: 'flex', flexGrow: 1}} className='relative w-full'></Input>
            <div style={{ height: '40px', marginLeft: '-30px', zIndex: 9999999}} className='flex h-full justify-center items-center'>
            <IconButton onClick={() => {setQ(''); setSearchResults([])}} variant={'icon'}>
                <FaXmark />
            </IconButton>
            </div>
            {searchResults.length > 0 ? <>
            <div style={{ position: 'absolute', zIndex: 9999998,  backgroundColor: 'transparent', opacity: 0.5, width: '100vw', height: '100vh', overflow: 'hidden'}} onClick={() => {setQ(''); setSearchResults([])}}></div>
            <List style={{ backgroundColor: '#fefefe', position: 'fixed', zIndex: 9999999, left: '55px', top: '100px', minWidth: 'calc(60vw - 25px)', maxHeight: '60vh', overflowY: 'auto'}}>{ searchResults.map((ev, i) => {

              return <CalendarEvent mobile={isSmallScreen} variant={'search'} draggable={true} onDragStart={(e) => { dragstartHandler(e) }} onClickDelete={() => { deleteEventCallback(ev)}} onClickEdit={() => updateEventCallback(ev)} key={i} index={i} datetime={ev.datetime.format("DD/MM/YYYY HH:ss")}>{ isSmallScreen ? <>#{i+1} - {ev.datetime.format("DD/MM/YYYY HH:ss")}</>: <>#{i+1} - {ev.datetime.format("DD/MM/YYYY HH:ss")}</>}</CalendarEvent>
              

            
          })}</List>
          </> : <></>}
            
            
            
          </div>
          <div>
            
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}} className="flex w-fit calendar-controls items-center p-4 gap-2">
            <Button style={{ marginRight: '5px'}} onClick={handleTodayClick}>
              Hoje
            </Button>
            <Select name="month" value={`${selectedMonth}`} options={monthOptions} onChange={handleMonthChange} />
            <button
              onClick={handlePrevYear}
              style={{ marginRight: '5px'}}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg className="size-5 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
              </svg>
            </button>
            <h1 style={{ borderRadius: '15px', fontSize: '15px', borderEadius: '15px',
              display: 'inline-flex',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center'}} className="min-w-16 p-3 text-center text-xl font-semibold sm:min-w-20 sm:text-xl">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              style={{ marginLeft: '5px'}}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg className="size-5 text-slate-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-7 justify-between text-slate-500">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="w-full border-b border-slate-200 py-2 text-center font-semibold">
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full px-5 pt-4 sm:px-8 sm:pt-6">
        {renderCalendar}
      </div>

      <AddConsultaDialog date={date} values={consultaDialogValues} open={openConsulta} setOpen={setOpenConsulta} />
      <AddSlotDialog date={date} values={slotsDialogValues} open={openSlots} setOpen={setOpenSlots} />
    </div>
  );
};

export const Select = ({ name, value, label, options = [], onChange, className }) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="bg-gradient-to-r cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg className="size-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
      </svg>
    </span>
  </div>
);
