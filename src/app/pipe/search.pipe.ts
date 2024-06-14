import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchString: string) {
    if(!items) return []
    if(!searchString) return items
    searchString = searchString.toLowerCase()
    const filterPolicy=items.filter((item: {policyType: string, policyName: string}) => item.policyType.toLowerCase().includes(searchString) || item.policyName.toLowerCase().includes(searchString));
    console.log(filterPolicy);
    return filterPolicy
  }

}
