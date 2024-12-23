import menuData from '@/assets/data/christmas-menu.json'

export interface Dish {
  id: number
  name: string
  description: string
  type?: string
}

export interface Menu {
  starters: Dish[]
  mainDishes: Dish[]
  desserts: Dish[]
  wines: Dish[]
}

const getMenu = (): Menu => {
  return menuData.menu
}

export default {
  getMenu,
}
