// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      let randBase = this.dna[Math.floor(Math.random() * 14)];
      //console.log(this.dna.indexOf(randBase) + randBase);
      let newBase = returnRandBase();
      while (randBase === newBase) {
        newBase = returnRandBase();
      }
      if (randBase !== newBase) {
        this.dna[this.dna.indexOf(randBase)] = newBase;
      }
      return this.dna;
    },
    compareDNA(pAeq) {
      let thisPAequor = this.dna;
      let outPAequor = pAeq.dna;
      let commonDNA = 0;
      for (let i = 0; i < 15; i++) {
        if (thisPAequor[i] === outPAequor[i]) {
          commonDNA++;
        }
      }
      let commonPercent = (commonDNA / 15) * 100;
      console.log(`DNA #1 and DNA #2 have ${commonPercent.toFixed(2)}% in common`);
    },
    willLikelySurvive() {
      let thisPAequor = this.dna;
      let survivalRate = 0;
      for (let i = 0; i < 15; i++) {
        if (thisPAequor[i] === "C" || thisPAequor[i] === "G") {
          survivalRate++;
        }
      }
      let ratePercent = survivalRate / 15;
      if (ratePercent >= 0.6) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function createPAequorArray() {
  let pAequorArray = [];
  let pAequorNum = 1;
  for (let i = 0; i < 30;) {
    let pAequor = pAequorFactory(pAequorNum, mockUpStrand());
    if (pAequor.willLikelySurvive() === true) {
      i++;
      pAequorNum++;
      pAequorArray.push(pAequor);
    }
  }
  return pAequorArray;
}

console.log(createPAequorArray());

/*
let pAequor1 = pAequorFactory(1, mockUpStrand());
let pAequor2 = pAequorFactory(2, mockUpStrand());

console.log(pAequor1);

pAequor1.mutate();
console.log(pAequor1);

pAequor1.compareDNA(pAequor2);

pAequor1.willLikelySurvive();

console.log(pAequor1.willLikelySurvive());
*/