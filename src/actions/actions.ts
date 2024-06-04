"use server";

import prisma from "@/lib/db";
import { PetInternal } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Pet } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addPet(pet: PetInternal) {
  await sleep(2500);

  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (error) {
    return { message: "Could not add pet" };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetInternal) {
  await sleep(2500);

  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: newPetData,
    });
  } catch (error) {
    return { message: "Could not edit pet" };
  }
  //revalidating layout within app because this is where it fetches all the pets data
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: Pet["id"]) {
  await sleep(2500);

  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (error) {
    console.log(error);

    return { message: "Could not checkout pet" };
  }
  revalidatePath("/app", "layout");
}
