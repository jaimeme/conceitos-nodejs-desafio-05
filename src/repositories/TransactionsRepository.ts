import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions.filter(transaction => {
      return transaction.type === 'income';
    });
    const outcome = this.transactions.filter(transaction => {
      return transaction.type === 'outcome';
    });
    const totalIncome = income.reduce(
      (accumulator, { value }) => Number(accumulator) + Number(value),
      0,
    );
    const totalOutcome = outcome.reduce(
      (accumulator, { value }) => Number(accumulator) + Number(value),
      0,
    );
    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
