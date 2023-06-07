import React, { useEffect, useState, useRef, useContext } from "react";

import "@css/pages/calcpage.css";

const SALARY_FREQUENCY = [
	'HOURLY', 'MONTHLY[173H]', 'YEARLY[2080H]', '13th', '14th',
]

const CURRENCIES = [
	'EUR', 'USD', 'CZK', 'PLN', 'GBP'
]

const CURRENCIES_RATE = {
	[CURRENCIES[0]]: { 
		[CURRENCIES[1]]: 1.0785391,
		[CURRENCIES[2]]: 23.6677,
		[CURRENCIES[3]]: 4.7137594,
		[CURRENCIES[4]]: 0.87748221,
	}, 
	[CURRENCIES[1]]: { 
		[CURRENCIES[0]]: 0.92730217,
		[CURRENCIES[2]]: 22.199531,
		[CURRENCIES[3]]: 4.3496777,
		[CURRENCIES[4]]: 0.80715584,
	}, 	
	[CURRENCIES[2]]: { 
		[CURRENCIES[0]]: 0.0422517,
		[CURRENCIES[1]]: 0.045051097,
		[CURRENCIES[3]]: 0.1968727,
		[CURRENCIES[4]]: 0.036700161,
	},	
	[CURRENCIES[3]]: { 
		[CURRENCIES[0]]: 0.2121449,
		[CURRENCIES[1]]: 0.22987204,
		[CURRENCIES[2]]: 5.0808932,
		[CURRENCIES[4]]: 0.19343123,
	},	
	[CURRENCIES[4]]: { 
		[CURRENCIES[0]]: 1.1396242,
		[CURRENCIES[1]]: 1.2389181,
		[CURRENCIES[2]]: 27.247837,
		[CURRENCIES[3]]: 5.1697959,
	} 	 	
/*
*/
}

const SALARIES_DATA = [
//	[ "14,45", 2.500, 30.000, 32.500, 35.000 ], // [CURRENCIES[0]]: 
//	[ '15,6', '346,8', SALARY_FREQUENCY[2], SALARY_FREQUENCY[3], SALARY_FREQUENCY[4] ], // [CURRENCIES[1]]: 
//	[ '346,8', SALARY_FREQUENCY[1], SALARY_FREQUENCY[2], SALARY_FREQUENCY[3], SALARY_FREQUENCY[4] ], // 	[CURRENCIES[2]]: 
]

const CalcPage = (props) => {
	let { className, } = props;

  	const [inputVal, setInput] = useState(null);
  	const [frequencyIndex, setFrequency] = useState(0);
  	const [currency, setCurrency] = useState(0);

  	const [isGenerated, setIsGenerated] = useState(false);
  	const [triggerRecalculate, setTriggerRecalculate] = useState(false);
 
	const handleSubmit = (event) => {
	  	event.preventDefault();
	  	setTriggerRecalculate(prevState => !prevState);
	  	setIsGenerated(true);
	  	alert(`Submitting inputVal ${inputVal}`)

//console.log(CURRENCIES_RATE);
	}

	const Table = (props) => {
		let { inputValue, salaryFrequency, currency, triggerRecalc, className } = props;

  		const [salaries, setSalaries] = useState(SALARIES_DATA);

console.log(`### Table inputValue: ${inputValue}`);

		useEffect(() => {
			const inputRowIndex = parseInt(currency);
			const inputColIndex = parseInt(salaryFrequency);

			let inputHourly = 0;
			switch (inputColIndex) {
				case 0:
					inputHourly = inputValue;
					break;
				case 1:
					inputHourly = inputValue / 173;
					break;					
				case 2:
					inputHourly = inputValue / 2080;
					break;					
				case 3:
					inputHourly = inputValue / (2080+173);
					break;		
				case 4:
					inputHourly = inputValue / (2080+173+173);
					break;	
				default:
					console.error('### DEFAULT VALUE')
					break;															
			}

			let updatedData = [ 
				[], 
				[], 
				[] 
			];

			for (let currIndex=0; currIndex<CURRENCIES.length; currIndex++) {
console.log(`### Table currIndex: ${currIndex}`);
console.log(`### Table inputHourly : ${inputHourly}`);
console.log(`### Table parseInt(inputHourly) : ${parseInt(inputHourly)}`);
				
				const convertedHourly = (currIndex==inputRowIndex) 
					? parseFloat(inputHourly)
					: inputHourly * CURRENCIES_RATE[CURRENCIES[inputRowIndex]][CURRENCIES[currIndex]];

console.log(`### Table convertedHourly: ${convertedHourly}`);

				updatedData[currIndex] = [
					convertedHourly, convertedHourly*173, convertedHourly*2080, convertedHourly*(2080+173), convertedHourly*(2080+173+173), 
				]
			}
console.log("### SALARIES DATA");
console.log(updatedData);
			setSalaries(updatedData)

		}, [triggerRecalc])


		return ((triggerRecalc&&isGenerated) || (triggerRecalc==null)) && (
			<div className={`calc-page__table flex-col  flex-center ${className}`}>

				<div className={`calc-page__row heading flex-center`}>
					<div className={`calc-page__col`}>CURRENCY</div>
					<div className={`calc-page__col`}>HOURLY</div>
					<div className={`calc-page__col`}>MONTHLY[173H]</div>
					<div className={`calc-page__col`}>YEARLY[2080H]</div>
					<div className={`calc-page__col`}>13th</div>
					<div className={`calc-page__col`}>14th</div>
				</div>

				{CURRENCIES.map((currLabel, currIndex) => (
					<div className={`calc-page__row flex-center`}>
						<div className={`calc-page__col currency`}>{currLabel}</div>
						{SALARY_FREQUENCY.map((freqLabel, freqIndex) => (
							<>
							<div className={`calc-page__col`}>{parseInt(salaries[currIndex] && salaries[currIndex][freqIndex]).toFixed(2)}</div>
							</>
						))}
					</div>
				))}

			</div>
		)
	}

	return (
		<div className={`calc-page__container flex-col flex-center`}>
{/*
			<div className={`calc-page__table flex-col  flex-center`}>
				<div className={`calc-page__row heading flex-center`}>
					<div className={`calc-page__col`}>CURRENCY</div>
					<div className={`calc-page__col`}>HOUR</div>
					<div className={`calc-page__col`}>MONTHLY[173H]</div>
					<div className={`calc-page__col`}>YEARLY[2080H]</div>
					<div className={`calc-page__col`}>13th</div>
					<div className={`calc-page__col`}>14th</div>
				</div>
				<div className={`calc-page__row flex-center`}>
					<div className={`calc-page__col currency`}>EUR</div>
					<div className={`calc-page__col`}>14,45</div>
					<div className={`calc-page__col`}>2.500</div>
					<div className={`calc-page__col`}>30.000</div>
					<div className={`calc-page__col`}>32.500</div>
					<div className={`calc-page__col`}>35.000</div>
				</div>
				<div className={`calc-page__row flex-center`}>
					<div className={`calc-page__col currency`}>USD</div>
					<div className={`calc-page__col`}>15,6</div>
					<div className={`calc-page__col`}>2.700</div>
					<div className={`calc-page__col`}>32.400</div>
					<div className={`calc-page__col`}>35.100</div>
					<div className={`calc-page__col`}>37.800</div>
				</div>
				<div className={`calc-page__row flex-center`}>
					<div className={`calc-page__col currency`}>CZK</div>
					<div className={`calc-page__col`}>346,8</div>
					<div className={`calc-page__col`}>60.000</div>
					<div className={`calc-page__col`}>720.000</div>
					<div className={`calc-page__col`}>780.000</div>
					<div className={`calc-page__col`}>840.000</div>
				</div>
			</div>
*/}

			<Table 
				className=""
				inputValue={2500} 
				salaryFrequency={1} 
				currency={0}
//				triggerRecalc={triggerRecalculate}
			/>


			<form onSubmit={handleSubmit} className={`calc-page__form flex-center`}>
				<input type="text" value={inputVal} onChange={(event) => setInput(event.target.value)} />
				<select value={currency} onChange={(event) => setCurrency(event.target.value)}>
					{CURRENCIES.map((curr, index) => (
						<option value={index}>{curr}</option>
					))}
				</select>
				<select value={frequencyIndex} onChange={(event) => setFrequency(event.target.value)}>
					{SALARY_FREQUENCY.map((freqLabel, index) => (
						<option value={index}>{freqLabel}</option>
					))}
				</select>
				<input type="submit" value="Generate" />
			</form>
{/*
			<div className={`calc-page__arrow ${isGenerated? 'visible' :''} flex-col`}>
				<div className={`calc-page__arrow-tail  flex-center`}>
					<canvas className={`calc-page__arrow-tail__line left`} />
					<canvas className={`calc-page__arrow-tail__line right`} />
				</div>
				<div className={`calc-page__arrow-head  flex-center`}>
					<canvas className={`calc-page__arrow-head__line left`} />
					<canvas className={`calc-page__arrow-head__line right`} />
				</div>
			</div>
*/}
			<Table 
				className="generated"
				inputValue={inputVal} 
				salaryFrequency={frequencyIndex} 
				currency={currency}
				triggerRecalc={triggerRecalculate}
			/>

		</div>
	)
}

export default CalcPage;