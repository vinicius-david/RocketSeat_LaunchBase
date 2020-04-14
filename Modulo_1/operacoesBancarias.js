<<<<<<< HEAD
const user = { // dados do usuário
  name: 'Mariana',
  transactions: [],
  balance: 0
};

function createTransaction(transaction) {  // função que adiciona as transações como positivas ou negativas

  if ( transaction.type == 'credit' ) {

  user.transactions.push(transaction.value);
  user.balance = user.balance + transaction.value // soma transação na balança

  } else {

    user.transactions.push(transaction.value * (-1));
    user.balance = user.balance - transaction.value
  }
}

function getHigherTransactionByType(type) { // função que retorna os maiores créditos e débitos

  if ( type == 'credit' ) {

    let higherCredit = 0

    for( let i = 0; i < user.transactions.length; i++ ) {
      if ( user.transactions[i] > higherCredit )
      higherCredit = user.transactions[i]
    }

    const creditResult = {
      type: 'credit',
      value: higherCredit
    }

    console.log(creditResult);
  } else {

    let higherDebit = 0

    for( let i = 0; i < user.transactions.length; i++ ) {
      if ( user.transactions[i] < higherDebit )
      higherDebit = user.transactions[i]
    }

    const deditResult = {
      type: 'debit',
      value: higherDebit
    }
    
    console.log(deditResult);
  }
}

function getAvarageTransactionValue() {  // função que retorna a média do módulo das transações

  let sum = 0

  for ( let i = 0; i < user.transactions.length; i++ ) {
    if ( user.transactions[i] > 0 ) {
      sum = sum + user.transactions[i]
    } else {
      sum = sum - user.transactions[i]
    }
  }

  const avarage = sum / user.transactions.length

  console.log(avarage);
}

function getTransactionsCount() {
  let creditCount = 0
  let debitCount = 0
  for ( let i = 0; i < user.transactions.length; i++ ) {
    if ( user.transactions[i] > 0 ) {
      creditCount = creditCount + 1
    } else {
      debitCount = debitCount +1
    }
  }

  const count = {
    credit: creditCount,
    debit: debitCount
  }

  console.log(count);
}

createTransaction({ type: 'credit', value: 50 });
createTransaction({ type: 'credit', value: 120 });
createTransaction({ type: 'debit', value: 80 });
createTransaction({ type: 'debit', value: 30 });

console.log(user.balance);

getHigherTransactionByType('credit');
getHigherTransactionByType('debit');

getAvarageTransactionValue();

getTransactionsCount();
=======
const user = { // dados do usuário
  name: 'Mariana',
  transactions: [],
  balance: 0
};

function createTransaction(transaction) {  // função que adiciona as transações como positivas ou negativas

  if ( transaction.type == 'credit' ) {

  user.transactions.push(transaction.value);
  user.balance = user.balance + transaction.value // soma transação na balança

  } else {

    user.transactions.push(transaction.value * (-1));
    user.balance = user.balance - transaction.value
  }
}

function getHigherTransactionByType(type) { // função que retorna os maiores créditos e débitos

  if ( type == 'credit' ) {

    let higherCredit = 0

    for( let i = 0; i < user.transactions.length; i++ ) {
      if ( user.transactions[i] > higherCredit )
      higherCredit = user.transactions[i]
    }

    const creditResult = {
      type: 'credit',
      value: higherCredit
    }

    console.log(creditResult);
  } else {

    let higherDebit = 0

    for( let i = 0; i < user.transactions.length; i++ ) {
      if ( user.transactions[i] < higherDebit )
      higherDebit = user.transactions[i]
    }

    const deditResult = {
      type: 'debit',
      value: higherDebit
    }
    
    console.log(deditResult);
  }
}

function getAvarageTransactionValue() {  // função que retorna a média do módulo das transações

  let sum = 0

  for ( let i = 0; i < user.transactions.length; i++ ) {
    if ( user.transactions[i] > 0 ) {
      sum = sum + user.transactions[i]
    } else {
      sum = sum - user.transactions[i]
    }
  }

  const avarage = sum / user.transactions.length

  console.log(avarage);
}

function getTransactionsCount() {
  let creditCount = 0
  let debitCount = 0
  for ( let i = 0; i < user.transactions.length; i++ ) {
    if ( user.transactions[i] > 0 ) {
      creditCount = creditCount + 1
    } else {
      debitCount = debitCount +1
    }
  }

  const count = {
    credit: creditCount,
    debit: debitCount
  }

  console.log(count);
}

createTransaction({ type: 'credit', value: 50 });
createTransaction({ type: 'credit', value: 120 });
createTransaction({ type: 'debit', value: 80 });
createTransaction({ type: 'debit', value: 30 });

console.log(user.balance);

getHigherTransactionByType('credit');
getHigherTransactionByType('debit');

getAvarageTransactionValue();

getTransactionsCount();
>>>>>>> 82876af058933e7ca96427a1734539b283aee1f8
