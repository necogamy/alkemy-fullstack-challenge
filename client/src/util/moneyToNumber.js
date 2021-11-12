export const moneyToNumber = money => {
    money = money.split('');
    
    const i = money.indexOf('.');
    
    money.splice(i, money.length);
    
    let final = '';
    for (let item of money) {
        item = Number(item);
      if (item || item === 0) final += item;
    }
    
    return final = Number(final);
}